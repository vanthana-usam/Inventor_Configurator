 

/* eslint-disable no-undef */

Feature('Failed Upload Dialog');

Before(async ({ I }) => {
    I.amOnPage('/');
    await I.signIn();
});

Scenario('upload IPT and verify that exists report.txt url', ({ I }) => {

   I.uploadInvalidIPTFile('src/ui-tests/dataset/invalid.ipt');
});