import {browser, element, by, promise} from 'protractor';
import {Key} from 'selenium-webdriver';

export class GoalPage {
    static navigateTo(): promise.Promise<any> {
        return browser.get('/goals');
    }

         static getOwner(name: string) {
         const input = element(by.id('goalOwner'));
         input.click();
         input.sendKeys(name);
         const selectButton = element(by.id('submit'));
         selectButton.click();
     }

     getUniqueGoal(name: string) {
         const goal = element(by.id(name)).getText();
         this.highlightElement(by.id(name));

         return goal;
     }

     getGoalTitle() {
         const elementToGet = element.all(by.css("mat-panel-title")).last();
         elementToGet.click();
         // elementToGet.getAttribute('mat-panel-title');
         return elementToGet.getText();
     }

     clickElementByCss(css: string) {
         const elementToClick = element.all(by.css(css)).last();
         elementToClick.click();
         return elementToClick.isPresent();
     }

    static clickElement(elementId: string){
        const input = element(by.id(elementId));
        input.click();
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


    // Should be able to input a category since it is a required field
    // Or change category from being required and have the default be 'other'
    testAddNewGoal(name: string, frequency: string /*, category: string*/) {
        const input = element(by.id('addNewGoal'));
        input.click();
        const nameInput = element(by.id('name'));
        nameInput.sendKeys(name);
        const frequencyInput = element(by.id('frequency'));
        frequencyInput.click();
        frequencyInput.sendKeys(frequency);
        /*
        const categoryInput = element(by.id('category'));
        categoryInput.click();
        categoryInput.sendKeys(category);
        */
        const button = element(by.id('confirmAddGoalButton'));
        const buttonWasThere = button.isDisplayed();
        button.click();
        return buttonWasThere;
    }

    addAGoal(goalName: string, startDate: string, endDate: string, category: string, frequency: string, numberGoal: number) {
        const addGoalButton = element(by.id('addNewGoal'));
        const nameInput = element(by.id('name'));
        const startDateInput = element(by.id('startDate'));
        const endDateInput = element(by.id('endDate'));
        const categoryInput = element(by.id('category-goals'));
        const frequencyInput = element(by.id('frequency'));
        const submitGoalButton = element(by.id('confirmAddGoalButton'));

        addGoalButton.click();

        nameInput.click();
        nameInput.sendKeys(goalName);

        startDateInput.click();
        startDateInput.sendKeys(startDate);

        endDateInput.click();
        endDateInput.sendKeys(endDate);

        categoryInput.click();
        if (numberGoal === 1) {
            if (category.toLocaleLowerCase() === 'chores') {
                element(by.id('md-option-0')).click();
            } else if (category.toLocaleLowerCase() === 'health') {
                element(by.id('md-option-1')).click();
            } else if (category.toLocaleLowerCase() === 'social') {
                element(by.id('md-option-2')).click();
            } else if (category.toLocaleLowerCase() === 'other') {
                element(by.id('md-option-3')).click();
            }
        } else if(numberGoal === 2) {
            if (category.toLocaleLowerCase() === 'chores') {
                element(by.id('md-option-4')).click();
            } else if (category.toLocaleLowerCase() === 'health') {
                element(by.id('md-option-5')).click();
            } else if (category.toLocaleLowerCase() === 'social') {
                element(by.id('md-option-6')).click();
            } else if (category.toLocaleLowerCase() === 'other') {
                element(by.id('md-option-7')).click();
            }
        }

        frequencyInput.click();
        frequencyInput.sendKeys(frequency);

        submitGoalButton.click();
    }

}
