export class User{
    id: number;
    username: string;
    groupId: number;
    groupName: string;
    hashedPassword: string;

    constructor(id?:number, username?:string, groupId?:number, groupName?:string, hashedPassword?:string){
        this.id = id;
        this.username = username;
        this.groupId = groupId;
        this.groupName = groupName;
        this.hashedPassword = hashedPassword;
    }
}