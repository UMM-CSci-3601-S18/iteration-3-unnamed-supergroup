import {Component, OnInit} from '@angular/core';
import {gapi} from 'gapi-client';
import {environment} from "../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {CrisisButtonComponent} from "./crisis-button.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = "Sunshine Journal";

    windowWidth: number;
    windowHeight: number;
    constructor(public dialog: MatDialog){
    }

    //New function to return the name of the active user
    //window.* is not defined, or 'gettable' straight from HTML *ngIf
    //So this function will return that
    getLoginName(){
        var name = window['name'];
        return name;
    }

    ngOnInit() {
        //Function to set variables to be used in resizing the screen.
        this.windowHeight = window.screen.height;
        this.windowWidth = window.screen.width;


        //This first if statement makes it so that the e2e tests will still run without getting locked out of the site
        //This should probably be removed at some point and instead have the e2e tests use a fake user somehow
        if(environment.production) {
            //Fixes a bug where the first time an instance of the browser visits the page
            //It would display all users data instead of locking the user out and filtering
            if (localStorage.getItem('email') === null) {
                localStorage.setItem('email', '');
            }
        }
    }

    onResize(event){
        this.windowWidth = event.target.innerWidth;
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(CrisisButtonComponent, {
            width: '500px'
        });
    }

}
