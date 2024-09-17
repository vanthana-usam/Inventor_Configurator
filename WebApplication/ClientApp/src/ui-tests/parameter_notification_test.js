 

/* eslint-disable no-undef */
const parametersElement = '.parameters';
const updatedElements = '//div[(@class = "parameter" or @class = "parameter checkbox")] //input[contains(@class , "changedOnUpdate")]';
const tooltipTestNotify = '//div[contains(@class,"paramTooltip__flyout-container")][ancestor::div[contains(@class , "parameter") and contains(text(),"TestNotify")]]';
const parameterTestNotify = '//div[contains(@class , "parameter") and contains(text(),"TestNotify")]';

Feature('Parameter Notification');

Before(async ({ I }) => {
    I.amOnPage('/');
    await I.signIn();
});

// validate that Parameter notification is displayed
Scenario('should check parameter notification', async ({ I }) => {

    I.uploadIPTFile('src/ui-tests/dataset/EndCap.ipt');

    // select EndCap project in the Project Switcher
    I.selectProject('EndCap');
    I.waitForElement(parametersElement, 20);

    // change paramter
    I.setParamValue("NumberOfBolts", "5");

    I.updateProject();

    // check if there is correct number of changeOnUpdate inputs
    I.seeNumberOfElements(updatedElements, 1);

    // check if tooltip is displayed
    I.moveCursorTo(parameterTestNotify);
    I.waitForVisible(tooltipTestNotify, 5);

    I.seeTextEquals("Parameter has changed\nInventor Server updated the parameter. Your initial input was overridden.", tooltipTestNotify);
  });

  Scenario('Delete the project', ({ I }) => {

    I.deleteProject('EndCap');
  });