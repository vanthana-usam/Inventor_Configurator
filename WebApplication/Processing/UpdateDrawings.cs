 

using System.Collections.Generic;
using WebApplication.Definitions;

namespace WebApplication.Processing
{
    /// <summary>
    /// Update all drawings.
    /// </summary>
    public class UpdateDrawings : ForgeAppBase
    {
        public override string Id => nameof(UpdateDrawings);
        public override string Description => "Find all drawings and update them -> zip";

        protected internal override ForgeRegistration Registration { get; } = ForgeRegistration.All;

        protected override string OutputUrl(ProcessingArgs projectData) => projectData.DrawingUrl;
        protected override string OutputName => "drawing";
        protected override bool IsOutputZip => true;
        protected override bool IsOutputOptional => true;

        /// <summary>
        /// Command line for activity.
        /// </summary>
        public override List<string> ActivityCommandLine =>
            new List<string>
            {
                $"$(engine.path)\\InventorCoreConsole.exe /al \"$(appbundles[{ActivityId}].path)\" \"$(args[{InputDocParameterName}].path)\" "
            };

        /// <summary>
        /// Constructor.
        /// </summary>
        public UpdateDrawings(Publisher publisher) : base(publisher) {}
    }
}
