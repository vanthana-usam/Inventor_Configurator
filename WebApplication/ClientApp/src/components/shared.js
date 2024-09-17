 

// use fixed version of the viewer to avoid usage of untested viewer version
const viewerVersion = '7.96.0';

// in case you need to debug Viewer script/css - remove '.min' from the URLs
export const viewerCss = `https://developer.api.autodesk.com/modelderivative/v2/viewers/${viewerVersion}/style.min.css`;
export const viewerJs = `https://developer.api.autodesk.com/modelderivative/v2/viewers/${viewerVersion}/viewer3D.min.js`;
