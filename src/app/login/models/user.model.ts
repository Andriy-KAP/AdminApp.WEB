export class UserModel{
    email: string;
    password: string;
    dataCount: string;

    constructor(email: string, password: string, dataCount: string){
        this.email=email;
        this.password=password;
        this.dataCount = dataCount;
    }
}