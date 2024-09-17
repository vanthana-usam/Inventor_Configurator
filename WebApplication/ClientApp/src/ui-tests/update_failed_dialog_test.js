 

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const locators = require('./elements_definition.js');
const updatingDialogTitle = '//div[@role="dialog" and .//p[contains(.,"Updating Project")]]';
const failedDialogTitle = '//div[@role="dialog" and .//p[contains(.,"Update Failed")]]';
const projectShelves = '//div[@role="row"]//div[text()="shelves"]';

Feature('Failed Dialog');

Before(async ({ I }) => {
    I.amOnPage('/');
    await I.signIn();
});

//ensure that Failed Dialog is displayed when iLogic Failed!!!
Scenario('should check incorrect input to show failed dialog', ({ I }) => {

    // uploaded an assembly with iLogic error (missing parts for iLogic)
    I.uploadProject('src/ui-tests/dataset/shelves.zip', 'shelves.iam');

    // click on Shelves project
    I.waitForElement(projectShelves, 10);
    I.click(projectShelves);

    // set value for parameter
    I.setParamValue('iTrigger0', '5'  );

    // click on Update button
    I.click(locators.xpButtonUpdate);

    // waiting for Updating dialog
    I.waitForVisible(updatingDialogTitle, 10);
    I.waitForInvisible(updatingDialogTitle, locators.FDAActionTimeout);

    // check if Failed dialog is displayed
    I.waitForVisible(failedDialogTitle, 30);

});

Scenario('delete workflow', ({ I }) => {

   I.deleteProject('shelves');
});

