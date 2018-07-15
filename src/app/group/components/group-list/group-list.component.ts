import { Component, ViewChild, Output, EventEmitter, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { GroupPaginationModel } from "../../models/group-pagination.model";
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from "@angular/material";
import { Group } from "../../models/group.model";
import { GroupEditComponent } from "./components/edit/group-edit.component";
import { GroupRemoveComponent } from "./components/remove/group-remove.component";
import { GroupCreateComponent } from "./components/create/group-create.component";
import { OfficeService } from "../../services/office.service";
import { Office } from "../../models/office.model";

@Component({
    selector: 'group-list',
    templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit{
    public filter: string; 
    public pagination: GroupPaginationModel;
    public dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() loaded: EventEmitter<any>;
    @Output() loading: EventEmitter<any>;

    private existingOffices: Office[];

    constructor(private service: GroupService, private officeService: OfficeService,public dialog: MatDialog){
        this.pagination = new GroupPaginationModel();
        this.loaded= new EventEmitter<any>();
        this.loading = new EventEmitter<any>();
    }

    ngOnInit(){
        this.officeService.getOffices(1,10)
        .subscribe((response)=>{
            debugger;
            this.existingOffices= response.data.items;
        });
    }
    ngAfterViewInit(){
        this.getGroups(0,10, this.pagination);
    }
    onFilterChange(){
        console.log(this.filter);
        this.getGroups(0, this.paginator.pageSize, this.pagination, this.filter)
    }
    onPageChanged(context):void{
        this.getGroups(context.pageIndex, context.pageSize, this.pagination, this.filter);
    }
    private getGroups(pageIndex: number, pageSize: number, paginationModel: GroupPaginationModel, search?: string): void{
            this.loading.emit(null);
        this.service.getGroups(pageIndex +1, pageSize, search)
            .subscribe((response)=>{
                this.pagination.groups = response.data.items;
                this.dataSource = new MatTableDataSource(this.pagination.groups);
                this.dataSource.sort= this.sort;
                paginationModel.resultLength = response.data.totalCount;
                this.loaded.emit(null);
            });
    }
    edit(group: Group){
        let dialogRef = this.dialog.open(GroupEditComponent,{
            width: '550px',
            data: group
        });

        dialogRef.afterClosed().subscribe(result=>{
            if(result){
                debugger;
            }
        })
    }
    remove(id: number){
        let dialogRef = this.dialog.open(GroupRemoveComponent,{
            width: '550px',
            data: id
        });

        dialogRef.afterClosed().subscribe(result=>{
            if(result){

            }
        })
    }
    create(){
        debugger;
        let dialogRef = this.dialog.open(GroupCreateComponent,{
            width: '550px',
            data: {
                offices: this.existingOffices
            }
        });

        dialogRef.afterClosed().subscribe(result=>{
            if(result){
                this.service.createGroup(result)
                    .subscribe((response)=>{

                    });
            }
        })
    }
}