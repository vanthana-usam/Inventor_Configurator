 

using System;
using System.Runtime.InteropServices;
using Autodesk.Forge.DesignAutomation.Inventor.Utils;
using Inventor;
using PluginUtilities;
using Shared;

namespace ExtractParametersPlugin
{
    [ComVisible(true)]
    public class ExtractParametersAutomation : AutomationBase
    {
        public ExtractParametersAutomation(InventorServer inventorApp) : base(inventorApp)
        {
        }

        public override void ExecWithArguments(Document doc, NameValueMap map)
        {
            LogTrace($"Run called with {doc.DisplayName}");

            try
            {
                using (new HeartBeat())
                {
                    Parameters parameters;
                    switch (doc.DocumentType)
                    {
                        case DocumentTypeEnum.kPartDocumentObject:
                            parameters = ((PartDocument) doc).ComponentDefinition.Parameters;
                            break;
                        case DocumentTypeEnum.kAssemblyDocumentObject:
                            parameters = ((AssemblyDocument) doc).ComponentDefinition.Parameters;
                            break;
                        default:
                            LogError($"Unsupported document type: {doc.DocumentType}");
                            return;
                    }

                    var paramsExtractor = new ParametersExtractor();
                    paramsExtractor.Extract(doc, parameters);
                }
            }
            catch (Exception e)
            {
                LogError("Processing failed. " + e.ToString());
            }
        }
     }
}