import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import {CustomModule} from '../custom.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
import {Emoji} from "../emoji";
import {Observable} from "rxjs/Observable";
import {FormsModule} from "@angular/forms";
import {HomeService} from "./home.service";

describe('Adding an emoji', () => {

    let component: HomeComponent;

    let fixture: ComponentFixture<HomeComponent>;

    const newEmoji: Emoji = {
        _id: '',
        owner: '',
        mood: 3,
        date: null, //date will be created during the test so that it matches what is made in component.addEmoji
        email: null,
    };

    const newId = 'nick_id';

    let calledEmoji: Emoji;

    let homeServiceStub: {
        addEmoji: (newEmoji: Emoji) => Observable<{'$oid': string}>
    };

    let mockMatDialog: {
        open: (ResponseComponent, any) => {
            afterClosed: () => void
        };
    };

    beforeEach(() => {
        calledEmoji = null;
        // stub UserService for test purposes
        homeServiceStub = {
            addEmoji: (emojiToAdd: Emoji) => {
                calledEmoji = emojiToAdd;
                return Observable.of({
                    '$oid': newId
                });
            }
        };

        mockMatDialog = {
            open: () => {
                return {afterClosed: () => {return}  };
            }
        };

        TestBed.configureTestingModule({
            imports: [FormsModule, CustomModule],
            declarations: [HomeComponent], // declare the test component
            providers: [
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: MatDialog, useValue: mockMatDialog},
                {provide: HomeService, useValue: homeServiceStub}]
        });

    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

});
