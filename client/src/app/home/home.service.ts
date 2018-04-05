import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Emoji} from '../emoji';
import {environment} from '../../environments/environment';

@Injectable()
export class HomeService {
    readonly baseResponseUrl: string = environment.API_URL + 'response';
    readonly baseUrl: string = environment.API_URL + 'emojis';
    private emojiUrl: string = this.baseUrl;
    private responseUrl: string = this.baseResponseUrl;

    constructor(private http: HttpClient) {
    }

    addEmoji(newEmoji: Emoji): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        // Send post request to add a new user with the user data as the body with specified headers.
        return this.http.post<{'$oid': string}>(this.emojiUrl + '/new', newEmoji, httpOptions);
    }

    addResponse(newResponse: Response): Observable<{'$oid': string}>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        return this.http.post<{ '$oid': string }>(this.responseUrl + '/new', newResponse, httpOptions);
    }


    getEmojiById(id: string): Observable<Emoji> {
        return this.http.get<Emoji>(this.emojiUrl + '/' + id);
    }
    getEmojis(emojiOwner?: string): Observable<Emoji[]> {
        return this.http.get<Emoji[]>(this.emojiUrl);
    }




}
