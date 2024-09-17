 

/* eslint-disable no-undef */
const locators = require('./elements_definition.js');
const assert = require('assert');
const newParamValue = '24 mm';
const paramName = 'Jaw Offset';

Feature('Update params');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('Updating parameters for model', async ({ I }) => {

    I.selectProject("Wrench");

    // enter new parameter value
    I.setParamValue(paramName, newParamValue);

    // check that stripe appeared
    I.waitForVisible(locators.xpStripeElement, 10);

    // Click on Update button
    I.updateProject();

    // check that stripe disappeared
    I.waitForInvisible(locators.xpStripeElement, 5);

    // check for updated parameter value
    const jawOffsetInput = '//div[text() = "'+ paramName +'"]//input';
    I.waitForVisible(jawOffsetInput, 20);
    const currentParamValue = await I.grabValueFrom(jawOffsetInput);
    assert.strictEqual(newParamValue, currentParamValue, 'Error: Parameter "' + paramName + '" has incorrect value!');
});