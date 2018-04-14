import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Journal} from './journal';

@Component({
    selector: 'app-view-journal.component',
    templateUrl: 'view-journal.component.html',
})

export class ViewJournalComponent {
    constructor(
        public dialogRef: MatDialogRef<ViewJournalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {journal: Journal}) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getDateString(journal: Journal): string {
        return new Date(journal.date).toDateString();
    }

}
