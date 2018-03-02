import {Component} from '@angular/core'

// Selector will change when we know more

@Component({
    selector: 'app-home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    public text: string;

    constructor() {
        this.text = 'Mongo lab';
    }


    pitch(event: any) {
        console.log(event.value);
    }
}



