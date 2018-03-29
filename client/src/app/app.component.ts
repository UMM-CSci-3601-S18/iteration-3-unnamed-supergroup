import {Component, Input, OnInit} from '@angular/core';
import {gapi} from 'gapi-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = "Sunshine Journal";

    //New function to return the name of the active user
    //window.* is not defined, or 'gettable' straight from HTML *ngIf
    //So this function will return that
    getLoginName(){
        var name = window['name'];
        return name;
    }

    ngOnInit() {
        //Fixes a bug where the first time an instance of the browser visits the page
        //It would display all users data instead of locking the user out and filtering
        if(localStorage.getItem('email') === null){
            localStorage.setItem('email', '');
        }
    }

}
