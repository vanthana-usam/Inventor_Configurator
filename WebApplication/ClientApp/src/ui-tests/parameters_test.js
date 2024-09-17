 

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const locators = require('./elements_definition.js');

Feature('Parameters panel');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('should check if Parameter panel has Reset and Update button', async ({ I }) => {

    // click on Model tab
    I.clickToModelTab();

    // check that Model tab has correct content
    I.see("Reset", locators.xpButtonReset );
    I.see("Update", locators.xpButtonUpdate );
});

//ensure that Stripe panel is not disabled!!!
Scenario('should check if Stripe panel is displayed and hidden', async ({ I }) => {

    I.selectProject('Wrench');

    // Set the model parameter to see strip
    I.setParamValue("Jaw Offset", "11 mm");

    // check if the Stripe element is displayed
    I.seeElement(locators.xpStripeElement);

    // Set the model parameter back to original value
    I.setParamValue("Jaw Offset", "10 mm");

    // check if the Stripe element was hidden
    I.waitForInvisible(locators.xpStripeElement, 5);
});


