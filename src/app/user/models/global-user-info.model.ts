export class GlobalUserInfo{
   allUsersCount: number =0;
   adminsCount: number =0;
   managersCount: number =0;

   constructor(allUsersCount?: number, adminsCount?: number, managersCount?: number){
        this.allUsersCount=allUsersCount;
        this.adminsCount=adminsCount;
        this.managersCount=managersCount;
   } 
}