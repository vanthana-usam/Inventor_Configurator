 

/* eslint-disable no-console */
/* eslint-disable no-undef */

Feature('Authentication');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('check Sign-in and Sign-out workflow', async ({ I }) => {
    await I.signIn();

    I.signOut();
});
