import { Component, ViewChild, Output, EventEmitter, OnInit, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { GroupPaginationModel } from "../../models/group-pagination.model";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
    selector: 'group-list',
    templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit{
    public pagination: GroupPaginationModel;
    public dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() loaded: EventEmitter<any>;
    @Output() loading: EventEmitter<any>;

    constructor(private service: GroupService){
        this.pagination = new GroupPaginationModel();
        this.loaded= new EventEmitter<any>();
        this.loading = new EventEmitter<any>();
    }

    ngOnInit(){
        this.getGroups(0,2, this.pagination);
    }
    private getGroups(pageIndex: number, pageSize: number, paginationModel: GroupPaginationModel): void{
        debugger;
        //this.loading.emit(null);
        this.service.getGroups(pageIndex +1, pageSize)
            .subscribe((response)=>{
                this.pagination.groups = response.data.items;
                this.dataSource = new MatTableDataSource(this.pagination.groups);
                this.dataSource.sort= this.sort;
                paginationModel.resultLength = response.data.totalCount;
          //      this.loaded.emit(null);
            });
    }
}