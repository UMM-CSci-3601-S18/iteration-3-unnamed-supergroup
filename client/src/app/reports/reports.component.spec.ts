import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {ReportsComponent} from "./reports.component";
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {CustomModule} from '../custom.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
import {MatDialog} from '@angular/material';
import {ReportsService} from "./reports.service";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {Emoji} from "../emoji";



describe('Reports list', () => {

    let emojiList: ReportsComponent;
    let fixture: ComponentFixture<ReportsComponent>;

    let ReportsListServiceStub: {
        getEmojis: () => Observable<Emoji[]>
    };

    beforeEach(() => {
        // stub ReportsService for test purposes
        ReportsListServiceStub = {
            getEmojis: () => Observable.of([
                {
                    _id: '13',
                    owner: 'Song',
                    mood: 3,
                    intensity: 1,
                    date: 'Sat Mar 24 2018 15:44:27 GMT-0500 (CDT)', //date will be created during the test so that it matches what is made in component.addEmoji
                    email: "song@gmail.com",
                },
                {
                    _id: '42',
                    owner: 'Yujing',
                    mood: 4,
                    intensity: 2,
                    date: 'Fri Mar 23 2018 15:40:00 GMT-0500 (CDT)', //date will be created during the test so that it matches what is made in component.addEmoji
                    email: "yujing@gmail.com",
                },
                {
                    _id: '52',
                    owner: 'Whoever',
                    mood: 5,
                    intensity: 2,
                    date: 'Wed Mar 21 2018 15:00:00 GMT-0500 (CDT)', //date will be created during the test so that it matches what is made in component.addEmoji
                    email: "whoever@gmail.com",
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [ReportsComponent],
            // providers:    [ UserListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: ReportsService, useValue: ReportsListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ReportsComponent);
            emojiList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('contains all the emojis', () => {
        expect(emojiList.emojis.length).toBe(3);
    });

    it('contains a owner named \'Song\'', () => {
        expect(emojiList.emojis.some((emoji: Emoji) => emoji.owner === 'Song')).toBe(true);
    });

    it('contain a user named \'Yujing\'', () => {
        expect(emojiList.emojis.some((emoji: Emoji) => emoji.owner === 'Yujing')).toBe(true);
    });

    it('doesn\'t contain a user named \'Nobody\'', () => {
        expect(emojiList.emojis.some((emoji: Emoji) => emoji.owner === 'Nobody')).toBe(false);
    });


    it('has two emoji with intensity two', () => {
        expect(emojiList.emojis.filter((emoji: Emoji) => emoji.intensity === 2).length).toBe(2);
    });

    it('has one emoji with mood four', () => {
        expect(emojiList.emojis.filter((emoji: Emoji) => emoji.mood === 4).length).toBe(1);
    });

    it('chart filters by start date', () => {
        console.log(emojiList.emojis);
        expect(emojiList.filteredEmojis.length).toBe(3);
        emojiList.startDate = new Date('Thu Mar 22 2018 15:45:00 GMT-0500 (CDT)');
        emojiList.refreshEmojis().subscribe(() => {
            expect(emojiList.filteredEmojis.length).toBe(2);
        });
    });

    it('chart filters by end date', () => {
        console.log(emojiList.emojis);
        expect(emojiList.filteredEmojis.length).toBe(3);
        emojiList.endDate = new Date('Thu Mar 22 2018 15:45:00 GMT-0500 (CDT)');
        emojiList.refreshEmojis().subscribe(() => {
            expect(emojiList.filteredEmojis.length).toBe(1);
        });
    });

    it('chart filters by emotion', () => {
        console.log(emojiList.emojis);
        emojiList.chartEmojis = emojiList.emojis;
        expect(emojiList.chartEmojis.length).toBe(3);
        emojiList.refreshEmojis().subscribe(() => {
            expect(emojiList.filterChart('', '4','2')).toBe(1);
        });
    });



});





