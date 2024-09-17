 

using System.Collections.Generic;
using Autodesk.Forge.DesignAutomation.Model;
using WebApplication.Definitions;

namespace WebApplication.Processing
{
    /// <summary>
    /// Universal plugin to extract different kinds of data during adoption:
    /// - drawings list
    /// - unsupported plugins
    /// - (NYI) missing references
    /// </summary>
    public class DataChecker : ForgeAppBase
    {
        public override string Id => nameof(DataChecker);
        public override string Description => "Data checker during adoption";

        // first output argument: JSON with list of drawings in the project
        protected override string OutputUrl(ProcessingArgs projectData) => projectData.DrawingsListUrl;
        protected override string OutputName => "drawings-list.json";
        protected override bool IsOutputZip => false;

        // second output argument: JSON with adoption messages
        private const string MessagesFileName = "adopt-messages.json";
        private const string MessagesParamName = nameof(DataChecker) + "Messages";

        /// <summary>
        /// Constructor.
        /// </summary>
        public DataChecker(Publisher publisher) : base(publisher) {}

        public override Dictionary<string, IArgument> ToWorkItemArgs(ProcessingArgs data)
        {
            var args = base.ToWorkItemArgs(data); // includes only first output arg

            args.Add(MessagesParamName, new XrefTreeArgument { Verb = Verb.Put, Url = data.AdoptMessagesUrl, Optional = false });
            return args;
        }

        public override Dictionary<string, Parameter> GetActivityParams()
        {
            var activityParams = base.GetActivityParams(); // includes only first output arg

            activityParams.Add(MessagesParamName, new Parameter { Verb = Verb.Put, LocalName = MessagesFileName, Zip = false });
            return activityParams;
        }

        public override List<string> ActivityCommandLine =>
            new List<string>
            {
                $"$(engine.path)\\InventorCoreConsole.exe /al \"$(appbundles[{ActivityId}].path)\" /i \"$(args[{InputDocParameterName}].path)\""
            };
    }
}
