 

/* eslint-disable no-console */
/* eslint-disable no-undef */

Feature('Upload and delete');

Before(async ({ I }) => {
   I.amOnPage('/');
   await I.signIn();
});

Scenario('upload workflow', ({ I }) => {
   I.uploadProject('src/ui-tests/dataset/SimpleBox.zip', 'SimpleBox.iam');
});

Scenario('delete workflow', ({ I }) => {
   I.deleteProject('SimpleBox');
});
