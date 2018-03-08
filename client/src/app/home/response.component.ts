import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-response.component',
    templateUrl: 'response.component.html',
    styleUrls: ['./response.component.css'],
})
export class ResponseComponent {

    // links is an array of different responses we are using when you select an emoji in our home page

    public links: string[] = ['https://www.youtube.com/watch?v=Jyy0ra2WcQQ&feature=youtu.be',
        //'https://www.youtube.com/watch?v=xoYnqvadurg&feature=youtu.be',
        'https://www.youtube.com/watch?v=6kVlonPVAjI&feature=youtu.be',
        'https://www.youtube.com/watch?v=z39iodZOf00&feature=youtu.be',
        'https://www.youtube.com/watch?v=Yt1JtbhSIMc',
        'https://www.youtube.com/watch?v=csjhIkKnz4Q',
        'https://www.youtube.com/watch?v=Orrr7PyaZs4',
        'https://www.youtube.com/watch?v=uLu6iq0NaqU',
        'https://www.youtube.com/watch?v=eMHg8sSmKWs',
        'https://www.youtube.com/watch?v=hJbRpHZr_d0',
        'https://www.youtube.com/watch?v=Nw2oBIrQGLo&feature=youtu.be',
        'https://www.youtube.com/watch?v=XyNlqQId-nk&feature=youtu.be',
        'https://www.youtube.com/watch?v=EtH9Yllzjcc',
        'https://www.youtube.com/watch?v=BfFi4wba30g&feature=youtu.be',
        'https://www.youtube.com/watch?v=WxUulGkLu4I',
        'https://www.youtube.com/watch?v=1JArN6rag8s'
    ];


    constructor(
        public dialogRef: MatDialogRef<ResponseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { response: number }) {
    }

    // getLink is the magic function that randomly chooses one of the links in the array
    // that we added to the responses.component file to make sure the links are not
    // repetitive and random everytime

    getLink() : string {
        const index = Math.floor(Math.random() * this.links.length);
        return this.links[index];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
