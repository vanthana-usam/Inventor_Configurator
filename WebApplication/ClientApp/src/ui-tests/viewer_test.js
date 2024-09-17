 

/* eslint-disable no-undef */
const locators = require('./elements_definition.js');

Feature('Viewer');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('should check switch to model tab loads the viewer', ({ I }) => {

    const viewerModelSelector = '#ViewerModelStructurePanel';

    I.see('Model', locators.modelTab);
    I.clickToModelTab();
    I.waitForElement(locators.xpViewerCanvas, 10);
    I.waitForElement(viewerModelSelector, 10);
});
