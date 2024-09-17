 

/* eslint-disable no-undef */
const locators = require('./elements_definition.js');

Feature('Downloads');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('should check switch to downloads tab shows the downloads links', async ({ I }) => {

    // select the Wheel project
    I.selectProject('Wheel');
    I.see('Downloads', locators.downloadsTab);
    I.goToDownloadsTab();
    I.waitForElement('.BaseTable');

    // check number of rows in the Downloads tab
    I.seeNumberOfElements('.BaseTable__row', 4);

    // all expected download types are available
    I.see('IAM', '.BaseTable__row-cell a');
    I.see('RFA', '.BaseTable__row-cell a');
    I.see('BOM', '.BaseTable__row-cell a');
    I.see('Drawing', '.BaseTable__row-cell a');

    // check icons
    I.seeNumberOfElements({ css: '[src="products-and-services-24.svg"]'}, 3);
    I.seeNumberOfElements({ css: '[src="file-spreadsheet-24.svg"]'}, 1);
});
