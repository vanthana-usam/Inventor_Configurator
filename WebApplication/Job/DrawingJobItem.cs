 

using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Routing;
using WebApplication.Definitions;
using WebApplication.Processing;

namespace WebApplication.Job
{
    internal class DrawingJobItem : JobItemBase
    {
        private readonly string _hash;
        private readonly LinkGenerator _linkGenerator;

        public DrawingJobItem(ILogger logger, string projectId, string hash, ProjectWork projectWork, LinkGenerator linkGenerator)
            : base(logger, projectId, projectWork)
        {
            _hash = hash;
            _linkGenerator = linkGenerator;
        }

        public override async Task ProcessJobAsync(IResultSender resultSender)
        {
            using var scope = Logger.BeginScope("Drawing generation ({Id})");

            Logger.LogInformation($"ProcessJob (Drawing) {Id} for project {ProjectId} started.");

            (FdaStatsDTO stats, string reportUrl) = await ProjectWork.GenerateDrawingAsync(ProjectId, _hash);
            Logger.LogInformation($"ProcessJob (Drawing) {Id} for project {ProjectId} completed.");

            // TODO: this url can be generated right away... we can simply acknowledge that OSS file is ready,
            // without generating URL here
            var drawingUrl = _linkGenerator.GetPathByAction(controller: "Download",
                                                            action: "Drawing",
                                                            values: new { projectName = ProjectId, hash = _hash });

            // send resulting URL to the client
            await resultSender.SendSuccessAsync(drawingUrl, stats, reportUrl);
        }
    }
}