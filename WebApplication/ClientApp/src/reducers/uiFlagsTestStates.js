 

export const testState = {
    parametersEditedMessageClosed: 1,
    parametersEditedMessageRejected: 2,
    modalProgressShowing: 3,
    updateFailedShowing: 4,
    loginFailedShowing: 5,
    downloadFailedShowing: 6,
    downloadDrawingFailedShowing: 7,
    errorData: { type:1, reportUrl: 'https://foo' },
    downloadProgressShowing: 9,
    downloadProgressTitle: "Download Title",
    downloadUrl: 11,
    showUploadPackage: 13,
    uploadProgressShowing: 14,
    uploadProgressStatus: 'done',
    package: { file: null, root: '', assemblies: null },
    uploadFailedShowing: 16,
    activeTabIndex: 17,
    projectAlreadyExists: 18,
    showDeleteProject: 19,
    checkedProjects: [20],
    drawingProgressShowing: 21,
    drawingUrls: { "1" : "url1", "2" : "url2" },
    stats: { "1" : { credits: 3, processing: 2 }},
    activeDrawing: "1",
    drawings: [ "1", "2", "3" ],
    reportUrl: "http://report",
    adoptWithParamsProgressShowing: true,
    adoptWithParamsFailed: false,
    embeddedModeUrl: "http://embedded.json"
};

 export const fullState = {
     uiFlags: testState
 };