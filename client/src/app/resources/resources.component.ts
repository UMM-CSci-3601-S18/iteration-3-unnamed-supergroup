import {Component} from '@angular/core';

@Component({
    selector: 'resources-component',
    templateUrl: 'resources.component.html',
    styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent {
    public title: string;

    constructor() {
        this.title = 'Resources';
    }
}
