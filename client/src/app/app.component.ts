import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Sunshine Journal';

    onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        //get name with profile.getName()
        //get id with profile.getId()
    }
}
