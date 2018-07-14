import { Component, ContentChild, AfterContentInit, OnInit, ViewChild, NgZone, ElementRef } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { UserComponent } from "../../../user/user.component";
import { SignalRService } from "../../../user/services/signalr.service";
import { GetMessage } from "../../../user/services/getmessage";

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent{
    @ViewChild('userComponent') userComponent: any;
    public canSendMessage: Boolean;
    public allMessages: GetMessage;
    public isDrawerOpened: boolean = false;
    @ViewChild('drawer') drawer: any;

    constructor(private snackBar: MatSnackBar, private _signalRService: SignalRService, private _ngZone: NgZone){
        // this can subscribe for events
        this.subscribeToEvents();
        // this can check for conenction exist or not.
        this.canSendMessage = _signalRService.connectionExist;
        this.isDrawerOpened = false;
    }

    private subscribeToEvents(): void {
        // if connection exists it can call of method.
        this._signalRService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
            this._signalRService.connectToGroup();
        });
        // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
        this._signalRService.messageReceived.subscribe((message: GetMessage) => {
            this._ngZone.run(() => {
                this.allMessages = message;
                this._signalRService.openSnackBar(this.snackBar, 'New user has been created.');
            });
        });
    }
}