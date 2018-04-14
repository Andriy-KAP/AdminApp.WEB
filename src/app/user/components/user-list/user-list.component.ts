import { Component, ViewChild, OnInit, Injectable, EventEmitter, Output } from "@angular/core";
import { UserPaginationModel } from "../../models/user-pagination.model";
import { User } from "../../models/user.model";
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserListService } from "../../services/user-list.service";
import { UserEditComponent } from "./components/edit/user-edit.component";
import { UserRemoveComponent } from "./components/remove/user-remove.component";
import { GroupService } from "../../../group/services/group.service";
import { Group } from "../../../group/models/group.model";
import { UserCreateComponent } from "./components/create/user-create.component";

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

    constructor(private service: UserListService, public dialog: MatDialog, private groupService: GroupService){
        this.pagination = new UserPaginationModel();
        this.loaded = new EventEmitter<any>();
        this.loading = new EventEmitter<any>();
        
    }

    ngOnInit(){
        this.groupService.getGroups()
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

        })
    }
}