import { Sale } from "./sale.model";

export class SalePaginationModel {
    public readonly columns: string[];
    public sales: Sale[];
    public resultLength: number;

    constructor(){
        this.columns = ['id','name','groupName','userName', 'operations'];
    }
}