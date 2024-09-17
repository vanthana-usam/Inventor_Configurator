 

using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Routing;
using WebApplication.Processing;

namespace WebApplication.Job
{
    internal class RFAJobItem : JobItemBase
    {
        private readonly string _hash;
        private readonly LinkGenerator _linkGenerator;

        public RFAJobItem(ILogger logger, string projectId, string hash, ProjectWork projectWork, LinkGenerator linkGenerator)
            : base(logger, projectId, projectWork)
        {
            _hash = hash;
            _linkGenerator = linkGenerator;
        }

        public override async Task ProcessJobAsync(IResultSender resultSender)
        {
            using var scope = Logger.BeginScope("RFA generation ({Id})");

            Logger.LogInformation($"ProcessJob (RFA) {Id} for project {ProjectId} started.");

            (var stats, var reportUrl) = await ProjectWork.GenerateRfaAsync(ProjectId, _hash);
            Logger.LogInformation($"ProcessJob (RFA) {Id} for project {ProjectId} completed.");

            // TODO: this url can be generated right away... we can simply acknowledge that the OSS file is ready,
            // without generating a URL here
            string rfaUrl = _linkGenerator.GetPathByAction(controller: "Download",
                                                            action: "RFA",
                                                            values: new {projectName = ProjectId, hash = _hash});

            // send resulting URL to the client
            await resultSender.SendSuccessAsync(rfaUrl, stats, reportUrl);
        }
    }
}
