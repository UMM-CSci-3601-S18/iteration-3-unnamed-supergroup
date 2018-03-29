import {browser, element, by, promise} from 'protractor';
import {Key} from 'selenium-webdriver';

export class JournalingPage {
    static navigateTo(): promise.Promise<any> {
        return browser.get('/journaling');
    }

    addNewJournal(subject: string, body: string) {
        const input = element(by.id('addNewJournal'));
        input.click();
        const subjectInput = element(by.id('subjectField'));
        subjectInput.sendKeys(subject);
        const bodyInput = element(by.id('subjectField'));
        bodyInput.sendKeys(body);
        const button = element(by.id('confirmJournalAddButton'));
        const buttonWasThere = button.isDisplayed();
        button.click();
        return buttonWasThere;

    }

    static getPageTitle(): promise.Promise<string> {
        const title = element(by.css('title'));
        return title.getText();
    }

    getJournalText() {
        const card = element(by.css('.matCardJournals'));
        return card.getText();
    }
}
