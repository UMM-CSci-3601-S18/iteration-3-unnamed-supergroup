import {ResponsePo} from "./response.po";
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';
import {HomePage} from "./home.po";

const origFn = browser.driver.controlFlow().execute;

// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

    // queue 100ms wait between test
    // This delay is only put here so that you can watch the browser do its thing.
    // If you're tired of it taking long you can remove this call
    // origFn.call(browser.driver.controlFlow(), function () {
    //     return protractor.promise.delayed(100);
    // });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('ResponseGetter', () => {
    let page: ResponsePo;

    beforeEach(() => {
        page = new ResponsePo();
    });

    it('Should go to the submit button and click the "get a response" button', () => {
        HomePage.navigateTo();
        page.clickSubmitButton();
        page.clickGetResponseButton();
    });

});
