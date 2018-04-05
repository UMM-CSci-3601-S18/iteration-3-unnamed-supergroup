import {resources} from "./resources";
import {Component, OnInit} from '@angular/core';
import {ResourcesService} from './resources.service';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {AddResourcesComponent} from './add-resources.component';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'resources-component',
    templateUrl: 'resources.component.html',
    styleUrls: ['./resources.component.css'],
})


export class ResourcesComponent {
    public title: string;

    //for component testing
    public resources: resources[];
    public filteredResources: resources[];

    //the target variables
    public resourceName: string;
    public resourceURL: string;
    public resourceBody: string;
    public resourcePhone: string;
    showPage = false;

    private highlightedID: {'$oid': string} = { '$oid': '' };

    constructor(public resourcesService: ResourcesService, public dialog: MatDialog, public snackBar: MatSnackBar ) {
        this.title = 'Resources';
    }

    //New function to return the name of the active user
    //window.* is not defined, or 'gettable' straight from HTML *ngIf
    //So this function will return that
    getLoginName(){
        var name = window['name'];
        return name;
    }

    openDialog(): void {
        const newGoal: resources = {resourceName: '', resourcePhone:'', resourcesUrl:'', resourceBody:''};
        const dialogRef = this.dialog.open(AddResourcesComponent, {
            width: '300px',
            data: { goal : newGoal }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.resourcesService.addNewResource(result).subscribe(
                addGoalResult => {
                    this.highlightedID = addGoalResult;
                    this.refreshResources();
                },
                err => {
                    // This should probably be turned into some sort of meaningful response.
                    console.log('There was an error adding the resource.');
                    console.log('The error was ' + JSON.stringify(err));
                });
        });
    }


    //
    public filterResources(searchName: string, searchPhone: string,
                       searchURL: string, searchBody: string): resources[] {

        this.filteredResources = this.resources;

        // Filter by name
        if (searchName != null) {
            searchName = searchName.toLocaleLowerCase();

            this.filteredResources = this.filteredResources.filter(resources => {
                return !searchName || resources.resourceName.toLowerCase().indexOf(searchName) !== -1;
            });
        }

        // Filter by phone
        if (searchPhone != null) {
            searchPhone = searchPhone.toLocaleLowerCase();

            this.filteredResources = this.filteredResources.filter(resources => {
                return !searchPhone || resources.resourcePhone.toLowerCase().indexOf(searchPhone) !== -1;
            });
        }

        // Filter by URL
        if (searchURL != null) {
            searchURL = searchURL.toLocaleLowerCase();

            this.filteredResources = this.filteredResources.filter(resources => {
                return !searchName || resources.resourcesUrl.toLowerCase().indexOf(searchURL) !== -1;
            });
        }

        // Filter by body
        if (searchBody != null) {
            searchBody = searchBody.toLocaleLowerCase();

            this.filteredResources = this.filteredResources.filter(resources => {
                return !searchBody || resources.resourceBody.toLowerCase().indexOf(searchBody) !== -1;
            });
        }

        return this.filteredResources;
    }

    //for refreshing resources
    refreshResources(): Observable<resources[]> {
        // Get resources returns an Observable, basically a "promise" that
        // we will get the data from the server.
        //
        // Subscribe waits until the data is fully downloaded, then
        // performs an action on it (the first lambda)
        const goalObservable: Observable<resources[]> = this.resourcesService.getResources();
        goalObservable.subscribe(
            resources => {
                this.resources = resources;
                this.filterResources(this.resourceName, this.resourcePhone, this.resourceURL, this.resourceBody);
            },
            err => {
                console.log(err);
            });
        return goalObservable;
    }


    //make it can delete
    /*
    deleteResources(_id: string){
        this.goalService.deleteGoal(_id).subscribe(
            goals => {
                this.refreshGoals();
                this.loadService();
            },
            err => {
                console.log(err);
                this.refreshGoals();
                this.loadService();
            }
        );
    }
    */

}
