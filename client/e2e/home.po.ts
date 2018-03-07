import {browser, element, by, promise} from 'protractor';
import {Key} from 'selenium-webdriver';

export class HomePage {
    static navigateTo(): promise.Promise<any> {
        return browser.get('');
    }

    static typeAName(name: string) {
        const input = element(by.id('test'));
        input.click();
        input.sendKeys(name);
    }

    static selectTheSlider(){
        const input = element(by.css('mat-slider.slider'));
        input.click();
    }

    static SlideTheSliderUp(){
        browser.actions().sendKeys(Key.ARROW_UP).perform();
    }

    static selectUpKey() {
        browser.actions().sendKeys(Key.ARROW_UP).perform();
    }

    static backspace() {
        browser.actions().sendKeys(Key.BACK_SPACE).perform();
    }

    clickSubmitButton(): promise.Promise<void> {
        this.highlightElement(by.id('submitEmoji'));
        console.log("dsfdsfdsfds");
        return element(by.buttonText('Submit')).click();
    }





    // http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return 'highlighted';
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getUserTitle() {
        const title = element(by.id('user-list-title')).getText();
        this.highlightElement(by.id('user-list-title'));

        return title;
    }




    buttonExists(): promise.Promise<boolean> {
        this.highlightElement(by.id('submitEmoji'));
        return element(by.id('submitEmjoji')).isPresent();
    }


    clickSldier(): promise.Promise<void> {
        this.highlightElement(by.id('slider'));
        return element(by.id('slider')).click();
    }


}
