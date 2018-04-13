import {browser} from 'protractor';

export class AppPage {
    static navigateTo() {
        return browser.get('/');
    }

    fakeLogin(){
        browser.executeScript("window.localStorage.setItem('name', 'Bootstrap')");
        browser.executeScript("window.localStorage.setItem('email', 'e2etesting')");
    }

}
