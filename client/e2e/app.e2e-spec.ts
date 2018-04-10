import {AppPage} from './app.po';
import {by, element} from 'protractor';

describe('angular-spark-lab', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should load', () => {
        AppPage.navigateTo();
    });

    it('should contain the crisis button', () => {
        AppPage.navigateTo();
        expect(element(by.id('crisis-button'))).toBeDefined();
    });
});
