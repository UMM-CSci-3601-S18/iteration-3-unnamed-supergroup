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
        var name = localStorage.getItem('name');
        return name;
    }

    ngOnInit() {
        //Function to set variables to be used in resizing the screen.
        this.windowHeight = window.screen.height;
        this.windowWidth = window.screen.width;
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
