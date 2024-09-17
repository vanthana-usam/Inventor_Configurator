 

/* eslint-disable no-undef */

//If the locator is an object, it should have a single element,
// with the key signifying the locator type (id, name, css, xpath, link, react, or class)
// and the value being the locator itself. This is called a "strict" locator.
// https://codecept.io/locators/#css-and-xpath

module.exports = {
     xpButtonReset : locate('button').find('span').withText('Reset'),
     xpButtonUpdate : locate('button').find('span').withText('Update'),
     xpButtonOk: locate('button').find('span').withText('Ok'),
     AutodeskViewer : '#AutodeskViewer',
     xpLinkAdskForge : '//a[@href="https://forge.autodesk.com"]',
     xpComboProjects : '//div[@role="button"] //*[local-name()="svg"]',
     xpProjectWrench : '//li[contains(@role,"menuitem") and .//span[text()="Wrench"]]',
     xpProjectWheel : '//li[contains(@role,"menuitem") and .//span[contains(., "Wheel")]]',
     xpProjectList : '//ul//span[text()="Projects"]',
     xpButtonLog : '//button[contains(@title, "Log")]',
     xpStripeElement : '//p[contains(text(),"The model is out-of-date.")]',
     PrametersList : '.parameters',
     ParametersContainer : '.parametersContainer',
     BomContainer : '.bomContainer',
     DrawingContainer : '.drawingContainer',
     xpPopUpLog : '//div[contains(h3, "Navigation Action")]',
     xpViewerCanvas : '//*[@id="AutodeskViewer"] //canvas',
     projectsTab : locate('li').find('p').withText('Projects'),
     modelTab : locate('li').find('p').withText('Model'),
     bomTab : locate('li').find('p').withText('BOM'),
     drawingTab : locate('li').find('p').withText('Drawing'),
     downloadsTab : locate('li').find('p').withText('Downloads'),
     xpFirstInput : '//div[2]/div[1] //input',
     xpFirstInputOnModelTab : '//*[@id="model"]/div/div[1]/div[2]/div[1] //input',
     FDAActionTimeout: 600,
     xpButtonExportPDF: locate('button').find('span').withText('Export PDF'),
     getProjectFromSwitcher: (name) => { xp = '//li[contains(@role,"menuitem") and .//span[text()="' + name + '"]]';
          return locate(xp);
     },
     getProjectByName: (name) => locate('div').withAttr({role: 'gridcell'}).find('div').withText(name),
     getProjectRowByName: (name) => locate('div').withAttr({role: 'row'}).withChild('div').withText(name),
     xpErrorMessageTitle: '//div[@class="modalFailContent"]//p[contains(@class,"errorMessageTitle")]',
     xpErrorMessage: '//div[@class="modalFailContent"]//p[contains(@class,"errorMessage")][2]',
     xpWarningMessage: '#warningMsg',
     embeddedLoadingFailButtonOk: locate('.modalFailButtonsContainer').find('button').withText('Ok')
};