 

/* eslint-disable no-undef */
Feature('User Details Control');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('should check if user details control has the expected items', ({ I }) => {
    I.see("USER", locate('div').find('span.user'));
    I.see("A", locate('div').find('span.avatar-custom-style'));
    I.see("Anonymous", locate('div').find('span.username'));
    I.see("Sign In", locate('div').find('button'));
});