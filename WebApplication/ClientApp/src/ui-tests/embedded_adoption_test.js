 

/* eslint-disable no-undef */
const locators = require('./elements_definition.js');

Feature('Embedded Adoption');

// This test uses existing json pointing to existing dataset.
// It's purpose is just to verify the first step of adoption. it's fine if it uses cached data -
// - the embedded adoption processing is already tested on server side.
Before(({ I }) => {
    I.amOnPage('/?url=https://inventorio-dev-holecep.s3.us-west-2.amazonaws.com/Interaction/wrench_v2.json');
});

Scenario('Should check the adoption is started and finished', async ({ I }) => {
    // check if exists the Model tab
    I.see("Model", locators.modelTab);

    // viewer loaded
    const viewerModelSelector = '#ViewerModelStructurePanel';
    I.waitForElement(locators.xpViewerCanvas, 300);
    I.waitForElement(viewerModelSelector, 300);
});
