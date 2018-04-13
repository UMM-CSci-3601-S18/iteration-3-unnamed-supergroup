import {Component, OnInit} from '@angular/core';
import {Emoji} from '../emoji';
import {HomeService} from "./home.service";
import {MatDialog, MatSnackBar} from '@angular/material';
import {ResponseComponent} from "./response.component";

// Selector will change when we know more

@Component({
    selector: 'app-home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    public emoji: Emoji = {_id: '', owner: '', date: '', mood: 3, intensity: 1, email: localStorage.getItem('email')};
    public email: string = localStorage.getItem('email');

    public lastMood = 3;
    public lastIntensity = 1;

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
        this.emoji.date = date.toString();
        this.emoji.owner = window['name'];
        this.emoji.email = localStorage.getItem('email');

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

    //This function takes in the mood and intensity, and returns the english interpretation
    //of mood and intensity, which is then displayed in html.
    parseEmotionIntensity(mood: number, intensity: number){
        if(mood == 1){
            if(intensity == 1) {return "Frustrated"}
            else return "Angry"
        }
        else if(mood == 2){
            if(intensity == 1) {return "Anxious"}
            else return "Worried"
        }
        else if(mood == 3){
            if(intensity == 1) {return "Happy"}
            else if(intensity == 2) {return "Content"}
            else return "Ecstatic"
        }
        else if(mood == 4){
            if(intensity == 1) {return "Meh"}
            else return "Bleh"
        }
        else if(mood == 5){
            if(intensity == 1) {return "Unhappy"}
            else if (intensity == 2) {return "Sad"}
            else return "Miserable"
        }

        //If for some reason it gets here..
        return '';
    }

    parseSwipeDirection(mood: number){
        if(mood < this.lastMood) {
            if(mood == 1 && this.lastMood == 5) {
                return "right";
            }
            else if(mood == 5 && this.lastMood == 1) {
                return "left";
            }
            else{
                return "left";
            }
        }
        else if(mood == this.lastMood) {
            return "none";
        }
        else {
            if(mood == 1 && this.lastMood == 5) {
                return "right";
            }
            else if(mood == 5 && this.lastMood == 1) {
                return "left";
            }
            else{
                return "right"
            }
        }

    }

    ngOnInit(){
        this.emoji.owner = window['name'];
    }

    isUserLoggedIN(): boolean {
        var email = localStorage.getItem('email');
        return ((email != '') && (typeof email != 'undefined'));
    }

    //This function pertains to mood carousel. It allows for the value of emoji.mood to
    //'wrap around' back to the start, so that it is in an infinite loop.
    updateEmojiMood(num: number, mood: number, update: boolean){

        if(update)
        {
            //Reset Intensity on each press of "previous" or "next" buttons.
            this.emoji.intensity = 1;

            //Keep Track of last mood.
            this.lastMood = mood;
        }

        var currentNumber = mood;
        currentNumber = currentNumber + num;
        if(currentNumber < 1) currentNumber = 5;
        if(currentNumber > 5) currentNumber = 1;
        return currentNumber;
    }

    //This function pertains to intensity carousel. It allows the value of emoji.intensity to
    //'wrap around', but due to variable amounts of intensities across emotions, keeps track of
    //which only have 2 total intensities, and 3 total intensities.
    updateEmojiIntensity(num: number, intensity: number, mood: number){

        //Keep Track of last intensity.
        this.lastIntensity = intensity;

        var currentNumber = intensity;
        currentNumber = currentNumber + num;

        //Find which moods have 2 intensities verses 3 intensities.
        switch(mood){
            case 1:
            case 2:
            case 4:
                if(currentNumber < 1) currentNumber = 2;
                else if(currentNumber > 2) currentNumber = 1;
                return currentNumber;

            case 3:
            case 5:
                if(currentNumber < 1) currentNumber = 3;
                else if(currentNumber > 3) currentNumber = 1;
                return currentNumber;
        }
    }
}



