import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Response} from './response';

@Component({
    selector: 'app-add-response.component',
    templateUrl: 'add-response.component.html',
    styleUrls: ['./add-response.component.css'],
})

export class AddResponseComponent {

    constructor(
        public dialogRef: MatDialogRef<AddResponseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {response: Response}) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
