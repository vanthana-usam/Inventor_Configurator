 

using System.Collections.Generic;
using WebApplication.Definitions;

namespace WebApplication.Processing
{
    public class CreateBOM : ForgeAppBase
    {
        public override string Id => nameof(CreateBOM);
        public override string Description => "Generate BOM for Inventor document";

        protected override string OutputUrl(ProcessingArgs projectData) => projectData.BomUrl;
        protected override string OutputName => "bom.json";

        public CreateBOM(Publisher publisher) : base(publisher) {}

        public override List<string> ActivityCommandLine =>
            new List<string>
            {
                $"$(engine.path)\\InventorCoreConsole.exe /al \"$(appbundles[{ActivityId}].path)\" /i \"$(args[{InputDocParameterName}].path)\""
            };
    }
}
