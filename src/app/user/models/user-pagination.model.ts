import { User } from "./user.model";

export class UserPaginationModel{
    public readonly columns: string[];
    public users: User[];
    public resultLength: number;

    constructor(){
        this.columns = ['id','email','groupName','operations'];
    }
}