import {Component} from '@angular/core';
import {gapi} from 'gapi-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Sunshine Journal';

    //This has been moved to index.html!
    /*onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        let name = profile.getName()
        let id = profile.getId()
        console.log(name + ' ' + id);
    }*/

}
