import { Component, ViewChild, OnInit, Injectable, EventEmitter, Output } from "@angular/core";
import { UserPaginationModel } from "../../models/user-pagination.model";
import { User } from "../../models/user.model";
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserListService } from "../../services/user-list.service";
import { UserEditComponent } from "./components/edit/user-edit.component";

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

    constructor(private service: UserListService, public dialog: MatDialog){
        this.pagination = new UserPaginationModel();
        this.loaded = new EventEmitter<any>();
        this.loading = new EventEmitter<any>();
        
    }

    ngOnInit(){
        
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
            
            this.dataSource = new MatTableDataSource(response.data.items);
            this.dataSource.sort = this.sort;
            paginationModel.resultLength = response.data.totalCount;
            this.loaded.emit(null);
        });
    }
    edit(user: User){
        let dialogRef = this.dialog.open(UserEditComponent, {
            width: '550px',
            data: { email: user['email'], hashedPassword: user['hashedPassword'] }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    } 
}