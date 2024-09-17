 

using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Routing;
using WebApplication.Definitions;
using WebApplication.Processing;

namespace WebApplication.Job
{
    /// <summary>
    /// Generate drawing PDF.
    /// </summary>
    internal class ExportDrawingPdfJobItem : JobItemBase
    {
        private readonly string _hash;
        private readonly LinkGenerator _linkGenerator;
        private readonly string _drawingKey;

        public ExportDrawingPdfJobItem(ILogger logger, string projectId, string hash, string drawingKey, ProjectWork projectWork, LinkGenerator linkGenerator)
            : base(logger, projectId, projectWork)
        {
            _hash = hash;
            _linkGenerator = linkGenerator;
            _drawingKey = drawingKey;
        }

        public override async Task ProcessJobAsync(IResultSender resultSender)
        {
            using var scope = Logger.BeginScope("Export Drawing PDF ({Id})");
            Logger.LogInformation($"ProcessJob (ExportDrawingPDF) {Id} for project {ProjectId} started.");

            (FdaStatsDTO stats, int drawingIndex, string reportUrl) = await ProjectWork.ExportDrawingPdfAsync(ProjectId, _hash, _drawingKey);

            Logger.LogInformation($"ProcessJob (ExportDrawingPDF) {Id} for project {ProjectId} completed.");

            string url = "";
            if (stats != null)
            {
                url = _linkGenerator.GetPathByAction(controller: "Download",
                                                                action: "DrawingPdf",
                                                                values: new { projectName = ProjectId, hash = _hash, index = drawingIndex });

                // when local url starts with a slash, it does not work, because it is doubled in url
                if (url.StartsWith('/'))
                {
                    url = url.Substring(1);
                }
            }

            await resultSender.SendSuccessAsync(url, stats, reportUrl);
        }
    }
}