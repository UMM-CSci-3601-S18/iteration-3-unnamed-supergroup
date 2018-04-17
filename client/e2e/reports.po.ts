import {browser, element, by, promise} from 'protractor';
import {Key} from 'selenium-webdriver';
import {ReportsService} from "../src/app/reports/reports.service";

export class ReportsPage {
    static navigateTo(): promise.Promise<any> {
        return browser.get('/reports');
    }

    totalEmojis(){
        var reportsService: ReportsService;
        return reportsService.getEmojis().count;
    }
}
