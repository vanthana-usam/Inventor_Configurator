 

using Autodesk.Forge.DesignAutomation.Model;
using System.Collections.Generic;
using WebApplication.Definitions;

namespace WebApplication.Processing
{
    /// <summary>
    /// RFA generator from Inventor document.
    /// </summary>
    public class CreateRFA : ForgeAppBase
    {
        public override string Id => nameof(CreateRFA);
        public override string Description => "Generate RFA from Inventor document";

        protected override string OutputUrl(ProcessingArgs projectData) => projectData.RfaUrl;
        protected override string OutputName => "Output.rfa";

        protected internal override ForgeRegistration Registration { get; } = ForgeRegistration.All;

        /// <summary>
        /// Constructor.
        /// </summary>
        public CreateRFA(Publisher publisher) : base(publisher) {}
    }
}
