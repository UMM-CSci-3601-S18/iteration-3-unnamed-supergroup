//Currently doesn't do

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {resources} from './resources';
import {environment} from '../../environments/environment';
import {ResourcesComponent} from "./resources.component";


@Injectable()
export class ResourcesService {
    readonly baseUrl: string = environment.API_URL + 'resources';
    private resourceUrl: string = this.baseUrl;

}
