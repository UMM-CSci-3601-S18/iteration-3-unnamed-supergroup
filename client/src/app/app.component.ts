import {Component} from '@angular/core';
import {gapi} from 'gapi-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Sunshine Journal';

    onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        //get name with
        let name = profile.getName()
        //get id with
        let id = profile.getId()

        console.log(name + ' ' + id);
    }

}
