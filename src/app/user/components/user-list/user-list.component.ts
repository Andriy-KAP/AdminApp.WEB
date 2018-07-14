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
import { GlobalUserInfo } from "../../models/global-user-info.model";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})

@Injectable()
export class UserListComponent implements OnInit {
    public filter: string;
    public globalUserInfo: GlobalUserInfo;
    public pagination: UserPaginationModel;
    public dataSource : MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() loaded: EventEmitter<any>;
    @Output() loading: EventEmitter<any>;

    isLoadingResults = true;
    isRateLimitReached = false;

    private existingGroups: Group[];

    constructor(private service: UserListService, public dialog: MatDialog, private groupService: GroupService, private _signalRService: SignalRService, private _ngZone: NgZone){
        this.pagination = new UserPaginationModel();
        this.loaded = new EventEmitter<any>();
        this.loading = new EventEmitter<any>();
        
    }
    ngOnInit(){
        this.groupService.getGroups(1,10)
            .subscribe((response)=>{
                this.existingGroups= response.data;
            });
    }
    ngAfterViewInit(){
        this.loadUsers(this.paginator.pageIndex, this.paginator.pageSize, this.pagination);
    }

    onFilterChange(){
        //debugger;
        console.log(this.filter);
        this.loadUsers(0, this.paginator.pageSize, this.pagination, this.filter);
    }

    onPageChanged(context): void{
        this.loadUsers(context.pageIndex, context.pageSize, this.pagination, this.filter);
    }

    private loadUsersGlobalInfo(){
        this.service.getUsersInfo()
            .subscribe((response)=>{
                this.globalUserInfo = new GlobalUserInfo(
                    response.data.allUsersCount,
                    response.data.adminsCount,
                    response.data.managersCount
                );
                this.loaded.emit(null);
            });
    }

    private loadUsers(pageIndex: number, pageSize: number, paginationModel: UserPaginationModel, search?: string):void{
        //this.loading.emit(null);
        this.service.getUsers(pageIndex+1, pageSize, search)
        .subscribe((response)=>{
            this.pagination.users = response.data.items;
            this.dataSource = new MatTableDataSource(this.pagination.users);
            this.dataSource.sort = this.sort;
            paginationModel.resultLength = response.data.totalCount;
            this.loadUsersGlobalInfo();
        });
    }
    edit(user: User){
        let dialogRef = this.dialog.open(UserEditComponent, {
            width: '550px',
            data: { 
                //id: user['id'],
                username: user['email'],
                //hashedPassword: user['hashedPassword'], 
                //groupName: user['groupName'], 
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