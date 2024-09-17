 

/* eslint-disable no-console */
/* eslint-disable no-undef */

Feature('Upload and delete IPT design');

Before(async ({ I }) => {
    I.amOnPage('/');
    await I.signIn();
});

 Scenario('upload IPT design workflow', ({ I }) => {
    I.uploadIPTFile('src/ui-tests/dataset/EndCap.ipt');
 });

 Scenario('delete IPT design workflow', ({ I }) => {
    I.deleteProject('EndCap');
 });