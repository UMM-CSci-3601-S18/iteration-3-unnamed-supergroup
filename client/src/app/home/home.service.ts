import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Emoji} from '../emoji';
import {environment} from '../../environments/environment';
import {Response} from "./response";

@Injectable()
export class HomeService {
    readonly baseResponseUrl: string = environment.API_URL + 'response';
    readonly baseUrl: string = environment.API_URL + 'emojis';
    private emojiUrl: string = this.baseUrl;
    private responseUrl: string = this.baseResponseUrl;

    constructor(private http: HttpClient) {
    }

    private parameterPresentResponse(searchParam: string) {
        return this.responseUrl.indexOf(searchParam) !== -1;
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

    getRandomResponse(responseEmail?: string): Observable<Response[]> {
        this.filterByEmail(responseEmail);
        console.log('This is the url we\'re sending: ' + this.responseUrl);
        return this.http.get < Response[]>(this.responseUrl);
    }


    getEmojiById(id: string): Observable<Emoji> {
        return this.http.get<Emoji>(this.emojiUrl + '/' + id);
    }
    getEmojis(emojiOwner?: string): Observable<Emoji[]> {
        return this.http.get<Emoji[]>(this.emojiUrl);
    }

    filterByEmail(responseEmail?: string): void {
        if(!(responseEmail == null || responseEmail === '')) {
            if (this.parameterPresentResponse('email=') ) {
                // there was a previous search by company that we need to clear
                this.removeParameter('email=');
            }
            if (this.responseUrl.indexOf('?') !== -1) {
                // there was already some information passed in this url
                this.responseUrl += 'email=' + responseEmail + '&';
            } else {
                // this was the first bit of information to pass in the url
                this.responseUrl += '?email=' + responseEmail + '&';
            }
        }
        else {
            if (this.parameterPresentResponse('email=')) {
                let start = this.responseUrl.indexOf('email=');
                const end = this.responseUrl.indexOf('&', start);
                if (this.responseUrl.substring(start - 1, start) === '?') {
                    start = start - 1;
                }
                this.responseUrl = this.responseUrl.substring(0, start) + this.responseUrl.substring(end + 1);
            }
        }
    }

    private removeParameter(searchParam: string) {
        const start = this.responseUrl.indexOf(searchParam);
        let end = 0;
        if (this.responseUrl.indexOf('&') !== -1) {
            end = this.responseUrl.indexOf('&', start) + 1;
        } else {
            end = this.responseUrl.indexOf('&', start);
        }
        this.responseUrl = this.responseUrl.substring(0, start) + this.responseUrl.substring(end);
    }

}
