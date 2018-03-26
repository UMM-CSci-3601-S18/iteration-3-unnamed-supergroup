import {Component, Input, OnInit} from '@angular/core';
import {gapi} from 'gapi-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = "Sunshine Journal";

    //New function to return the name of the active user
    //window.* is not defined, or 'gettable' straight from HTML *ngIf
    //So this function will return that
    getLoginName(){
        var name = window['name'];
        console.log("Name is: " + name + ".");
        return name;
    }

}
