import {ReportsPage} from './reports.po';
import {browser, element, by} from 'protractor';

const origFn = browser.driver.controlFlow().execute;

describe('Journaling Page', () => {
    let page: ReportsPage;

    beforeEach(() => {
        page = new ReportsPage();
    });

    /*
    totalEmojis() breaks the compiler due to the .count property not working on Observable<Emoji[]>

    it('Should contain 4 reports', () => {
        ReportsPage.navigateTo();
        expect(page.totalEmojis()).toBe(4);
    });
    */

    it('Should contain an angry emoji entry', () => {
       ReportsPage.navigateTo();
        expect(element(by.id('reportsEmojiText')).getAttribute('src')).toEqual('http://localhost:49152/assets/Emojis/1/2.png');
    });

    it('Should contain a content emoji entry', () => {
        ReportsPage.navigateTo();
        expect(element(by.id('reportsEmojiText')).getAttribute('src')).toEqual('http://localhost:49152/assets/Emojis/3/2.png');
    });

});
