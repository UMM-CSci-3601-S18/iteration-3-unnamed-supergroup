import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-response.component',
    templateUrl: 'response.component.html',
})
export class ResponseComponent {
    constructor(
        public dialogRef: MatDialogRef<ResponseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { response: number }) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
