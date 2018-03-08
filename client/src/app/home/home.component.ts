import {Component} from '@angular/core';
import {Emoji} from '../emoji';
import {HomeService} from "./home.service";
import {MatDialog, MatSnackBar, MatTooltip} from '@angular/material';
import {ResponseComponent} from "./response.component";

// Selector will change when we know more

@Component({
    selector: 'app-home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {

    public text: string;
    public emoji: Emoji = {_id: '', owner: '', date: '', mood: 3};


    constructor(public homeService: HomeService, public dialog: MatDialog, public snackBar: MatSnackBar) {
        this.text = 'Mongo lab';
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }

    openDialog(): void {
        const response = this.emoji.mood;
        const dialogRef = this.dialog.open(ResponseComponent, {
            width: '500px',
            data: { response }
        });
    }

    addEmoji(): void {

        const date = new Date();
        this.emoji.date = date.toString();

        this.homeService.addEmoji(this.emoji).subscribe(
            addEmojiResult => {
                console.log('emoji '+ addEmojiResult + ' successfully added');
                this.openSnackBar('Emoji Saved', 'OK');
            },
            err => {
                // This should probably be turned into some sort of meaningful response.
                console.log('There was an error adding the user.');
                console.log('The error was ' + JSON.stringify(err));
                this.openSnackBar('There was an error communicating with the server. Your entry was not saved.', 'OK');
            });

            this.openDialog();

    }

}



