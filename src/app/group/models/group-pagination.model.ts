import { Group } from "./group.model";

export class GroupPaginationModel{
    public readonly columns: string[];
    public groups: Group[];
    public resultLength: number;

    constructor(){
        this.columns= ['id', 'name', 'operations'];
    }
}