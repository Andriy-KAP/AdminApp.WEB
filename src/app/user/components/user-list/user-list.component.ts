import { Component, ViewChild, OnInit, Injectable, EventEmitter, Output, NgZone } from "@angular/core";
import { UserPaginationModel } from "../../models/user-pagination.model";
import { User } from "../../models/user.model";
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserListService } from "../../services/user-list.service";
import { UserEditComponent } from "./components/edit/user-edit.component";
import { UserRemoveComponent } from "./components/remove/user-remove.component";
import { GroupService } from "../../../group/services/group.service";
import { Group } from "../../../group/models/group.model";
import { UserCreateComponent } from "./components/create/user-create.component";
import { GetMessage } from "../../services/getmessage";
import { SignalRService } from "../../services/signalr.service";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})

@Injectable()
export class UserListComponent implements OnInit {
    public pagination: UserPaginationModel;
    public dataSource : MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() loaded: EventEmitter<any>;
    @Output() loading: EventEmitter<any>;

    isLoadingResults = true;
    isRateLimitReached = false;

    private existingGroups: Group[];

    public currentMessage: GetMessage;
    public allMessages: GetMessage;
    public canSendMessage: Boolean;

    @Output() onCreated = new EventEmitter<boolean>();

    constructor(private service: UserListService, public dialog: MatDialog, private groupService: GroupService, private _signalRService: SignalRService, private _ngZone: NgZone){
        this.pagination = new UserPaginationModel();
        this.loaded = new EventEmitter<any>();
        this.loading = new EventEmitter<any>();

        // this can subscribe for events  
        this.subscribeToEvents();  
        // this can check for conenction exist or not.  
        this.canSendMessage = _signalRService.connectionExist;  
        // this method call every second to tick and respone tansfered to client.  
        // setInterval(() => {  
        //     //this._signalRService.sendMessage();
        //     this._signalRService.connectToGroup();
        // }, 10000);
    }
    private subscribeToEvents(): void {  
        // if connection exists it can call of method.  
        this._signalRService.connectionEstablished.subscribe(() => {  
            this.canSendMessage = true;  
            this._signalRService.connectToGroup();
        });  
        // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
        this._signalRService.messageReceived.subscribe((message: GetMessage) => {    
            this._ngZone.run(() => {
                this.allMessages = message;
                this.onCreated.emit(true);
                //this._signalRService.openSnackBar('New user has been created.');
            });  
        });  
    }
    ngOnInit(){
        this.groupService.getGroups(1, 2)
            .subscribe((response)=>{
                this.existingGroups= response.data;
            })
    }
    ngAfterViewInit(){
        this.loadUsers(this.paginator.pageIndex, this.paginator.pageSize, this.pagination);
    }

    onPageChanged(context): void{
        this.loadUsers(context.pageIndex, context.pageSize, this.pagination);
    }

    private loadUsers(pageIndex: number, pageSize: number, paginationModel: UserPaginationModel):void{
        this.loading.emit(null);
        this.service.getUsers(pageIndex+1, pageSize)
        .subscribe((response)=>{
            this.pagination.users = response.data.items;
            this.dataSource = new MatTableDataSource(this.pagination.users);
            this.dataSource.sort = this.sort;
            paginationModel.resultLength = response.data.totalCount;
            this.loaded.emit(null);
        });
    }
    edit(user: User){
        let dialogRef = this.dialog.open(UserEditComponent, {
            width: '550px',
            data: { id: user['id'], 
                email: user['email'], 
                hashedPassword: user['hashedPassword'], 
                groupName: user['groupName'], 
                groupId: user['groupId'],
                groups: this.existingGroups    
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if(result){
                let user = new User(result.id, result.email, result.groupId, result.groupName, result.hashedPassword)
                this.service.editUser(user)
                    .subscribe((response)=>{
                        this.loadUsers(this.paginator.pageIndex, this.paginator.pageSize, this.pagination);
                    });
            }
          });
    }
    remove(id: number){
        let dialogRef = this.dialog.open(UserRemoveComponent, {
            width: '300px',
            data: { id: id }
        });

        dialogRef.afterClosed().subscribe(result =>{
            if(result){
                this.service.deleteUser(result.id)
                    .subscribe((response)=>{
                        this.loadUsers(this.paginator.pageIndex, this.paginator.pageSize, this.pagination);
                    });
            }
        })
    }
    create(){
        let dialogRef = this.dialog.open(UserCreateComponent, {
            width: '500px',
            data: {
                groups: this.existingGroups
            }
        });

        dialogRef.afterClosed().subscribe(result=>{
            if(result){
                let user = new User(null, result.value.username, result.value.groupId, null, result.value.password)
                this.service.createUser(user)
                    .subscribe((response)=>{
                        this._signalRService.sendMessageToGroup();
                    })
            }
        })
    }
}