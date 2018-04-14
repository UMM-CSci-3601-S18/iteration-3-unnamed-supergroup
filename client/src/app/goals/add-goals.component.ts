import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Goal} from './goals';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-goals.component',
    templateUrl: './add-goals.component.html',
    styleUrls: ['./add-goals.component.css'],
})
export class AddGoalComponent {
//    isLinear = true;
//    firstFormGroup: FormGroup;
//    secondFormGroup: FormGroup;
    name = new FormControl('', [Validators.required]);
    category = new FormControl('', [Validators.required]);
    constructor(
        public dialogRef: MatDialogRef<AddGoalComponent>,
        //        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {goal: Goal}) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    /*
        ngOnInit() {
            this.firstFormGroup = this._formBuilder.group({
                firstCtrl: ['', Validators.required]
            });
            this.secondFormGroup = this._formBuilder.group({
                secondCtrl: ['', Validators.required]
            });
        }
        */

    getNameErrorMessage(){
        return this.name.hasError('required') ? 'You must enter a name' : '';
    }

    getCategoryErrorMessage(){
        return this.category.hasError('required') ? 'You must enter a category' : '';
    }
}
