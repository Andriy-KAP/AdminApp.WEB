import { Injectable, EventEmitter } from '@angular/core'; 
import { GetMessage } from "./getmessage";
import { CONFIGURATION } from "./configuration";
import { JwtHelper } from "angular2-jwt";
import { MatSnackBar } from "@angular/material";
import { NotificationComponent } from "../../common/components/notification/notification.component";

declare var $: any;

@Injectable()
export class SignalRService{
    private proxy:any;
    private proxyName: string = 'UserHub';
    private connection: any;
    //create the event emmiters
    public messageReceived: EventEmitter<GetMessage>;
    public connectionEstablished: EventEmitter<Boolean>;
    public connectionExist: boolean;
    //jwt helper
    private jwtHelper:JwtHelper;

    constructor(){
        this.jwtHelper = new JwtHelper();
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.messageReceived = new EventEmitter<GetMessage>();
        this.connectionExist = false;
        //create hub connection
        this.connection=$.hubConnection(CONFIGURATION.baseUrls.server);
        //create a new proxy as name already given in top
        this.proxy = this.connection.createHubProxy(this.proxyName);
        //register on server events
        this.registerOnServerEvents();
        //call the connection start method
        this.startConnection();
    }
    private subscribeToEvents(){

    }
    public connectToGroup()
    {
        let token = sessionStorage.getItem('auth');
        let tokenObj = this.jwtHelper.decodeToken(token);
        this.proxy.invoke('JoinGroup', tokenObj.groupsid);
    }
    public sendMessageToGroup()
    {
        let token = sessionStorage.getItem('auth');
        let tokenObj = this.jwtHelper.decodeToken(token);
        this.proxy.invoke('SendGroupNotification', tokenObj.groupsid);
    }
    public sendMessage()
    {
        //server side hub method using proxy
        this.proxy.invoke('CreateNewUser');
    }
    private startConnection(): void {  
        this.connection.start().done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);  
            this.connectionEstablished.emit(true);  
            this.connectionExist = true;  
            this.proxy.invoke('JoinGroup');
        }).fail((error: any) => {  
            console.log('Could not connect ' + error); 
            this.connectionEstablished.emit(false);
        });
    }  
    private registerOnServerEvents(): void {  
        this.proxy.on('notify', (data: GetMessage) => {
            this.messageReceived.emit(data);
        });  
    }
    public openSnackBar(snackBar: MatSnackBar, message: string){
        snackBar.open(message,'',{
            duration: 5000
        });
    }  
}