import {browser, promise} from 'protractor';
import {ReportsService} from "../src/app/reports/reports.service";

export class ReportsPage {
    static navigateTo(): promise.Promise<any> {
        return browser.get('/reports');
    }

    /*
    .count doesn't exist on Observable<Emoji[]> causing the compiler to fail

    totalEmojis(){
        var reportsService: ReportsService;
        return reportsService.getEmojis().count;
    }
    */
}
