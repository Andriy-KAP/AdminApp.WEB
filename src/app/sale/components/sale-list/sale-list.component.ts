import { Component, ViewChild, Output, EventEmitter, Injectable } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from "@angular/material";
import { SalePaginationModel } from "../../models/sale-pagination.model";
import { SaleListService } from "../../services/sale-list.service";
import { GroupService } from "../../../group/services/group.service";
import { Group } from "../../../group/models/group.model";
import { SaleCreateComponent } from "./components/create/sale-create.component";

@Component({
    selector: 'sale-list',
    templateUrl: './sale-list.component.html'
})
@Injectable()
export class SaleListComponent{
    public filter: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() loaded: EventEmitter<any>;
    @Output() loading: EventEmitter<any>;
    public pagination: SalePaginationModel;
    public dataSource: MatTableDataSource<any>;

    isLoadingResults = true;
    isRateLimitReached = false;

    private existingGroups: Group[];

    constructor(private service: SaleListService, private groupService: GroupService, public dialog: MatDialog){
        this.pagination = new SalePaginationModel();
        this.loaded = new EventEmitter<any>();
        this.loading = new EventEmitter<any>();
    }
    ngOnInit(){
        this.groupService.getGroups(1,10)
        .subscribe((response)=>{
            this.existingGroups = response.data;
        });
    }
    ngAfterViewInit(){
        this.loadSales(this.paginator.pageIndex, this.paginator.pageSize, this.pagination);
    }
    onFilterChange(){
        this.loadSales(this.paginator.pageIndex, this.paginator.pageSize, this.pagination, this.filter);
    }
    private loadSales(pageIndex: number, pageSize: number, paginationModel: SalePaginationModel, search?: string):void{
        this.service.getSales(pageIndex+1, pageSize, search)
            .subscribe((response)=>{
                this.pagination.sales = response.data.items;
                this.dataSource = new MatTableDataSource(this.pagination.sales);
                this.dataSource.sort = this.sort;
                paginationModel.resultLength = response.data.totalCount;
                this.loaded.emit(null);
            });
    }
    create(){
        let dialogRef = this.dialog.open(SaleCreateComponent, {
            width: '500px',
            data: {
                groups: this.existingGroups
            }
        });

        dialogRef.afterClosed().subscribe(result=>{
            
        })
    }
}