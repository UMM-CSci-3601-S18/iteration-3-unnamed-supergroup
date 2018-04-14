import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {resources} from './resources';
import {MatSnackBar} from '@angular/material';


@Component({
    selector: 'add-resources.component',
    templateUrl: 'add-resources.component.html',
    styleUrls: ['./add-resources.component.css'],
})

export class AddResourcesComponent{
    constructor(
        public snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddResourcesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {resources: resources}) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
