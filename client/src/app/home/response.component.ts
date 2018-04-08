import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HomeService} from "./home.service";
import {HttpClient} from "@angular/common/http";
@Component({
    selector: 'app-response.component',
    templateUrl: 'response.component.html',
    styleUrls: ['./response.component.css'],
})
export class ResponseComponent {

    public email: string = localStorage.getItem('email');

    getLinksFromDatabase(email: string): string[] {
        /*let service = new HomeService(this.http);
        let responses = service.getResponses(email);

        var linkResponses: string[];
        var i: number;
        for(i = 0; i < responses; i++) {
            linkResponses.concat(responses[i].link);
        }
        return linkResponses;*/
        return null;
    }


    constructor(
        private http: HttpClient,
        public dialogRef: MatDialogRef<ResponseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { response: number }) {
    }

    // getLink is the magic function that randomly chooses one of the links in the array
    // that we added to the responses.component file to make sure the links are not
    // repetitive and random everytime

    getLink() : void {
        let links = this.getLinksFromDatabase(this.email);
        if(links != null) {
            var index = Math.floor(Math.random() * links.length);
            window.open(links[index]);
            console.log("Links is not null");
        }
        else {
            window.alert("There are no response links! Please add some.");
            console.log("Links is null");
        }


        //Make sure dialog box closes after opening link
        this.onNoClick()
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
