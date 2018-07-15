export class Group{
    public id: number;
    public name: string;
    public officeId: number;
    public officeName: string;

    constructor(id?: number, name?: string, officeId?: number, officeName?: string){
        this.id = id;
        this.name = name;
        this.officeId = officeId;
        this.officeName = officeName;
    }
}