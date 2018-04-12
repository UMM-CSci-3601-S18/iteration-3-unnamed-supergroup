import {Component, OnInit} from '@angular/core';
import {Emoji} from '../emoji';
import {HomeService} from './home.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ResponseComponent} from './response.component';

// Selector will change when we know more

@Component({
    selector: 'app-home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    public emoji: Emoji = {_id: '', owner: '', date: null, mood: 5, email: localStorage.getItem('email')};
    public email: string = localStorage.getItem('email');

    constructor(public homeService: HomeService, public dialog: MatDialog, public snackBar: MatSnackBar) {

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
        this.emoji.date = null;
        this.emoji.owner = window['name'];
        this.emoji.email = localStorage.getItem('email');

        this.homeService.addEmoji(this.emoji).subscribe(
            addEmojiResult => {
                console.log('emoji ' + addEmojiResult + ' successfully added');
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

    // This function is used to turn the number of the matslider into a word to be
    // displayed in the html.
    parseEmotion(num: number) {
        switch (num) {
            case 1:
                return 'anxious';
            case 2:
                return 'sad';
            case 3:
                return 'down';
            case 4:
                return 'meh';
            case 5:
                return 'happy';
            case 6:
                return 'radiant';
        }

        // If for some reason it gets here..
        return null;
    }

    ngOnInit() {
        this.emoji.owner = window['name'];
    }

    isUserLoggedIN(): boolean {
        const email = localStorage.getItem('email');
        return ((email !== '') && (typeof email !== 'undefined'));
    }
}



