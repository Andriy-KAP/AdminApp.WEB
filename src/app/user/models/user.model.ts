export class User{
    id: number;
    username: string;
    hashedPassword: string;

    constructor(id?:number, username?:string, hashedPassword?:string){
        this.id = id;
        this.username = username;
        this.hashedPassword = hashedPassword;
    }
}