 

using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Shared;
using WebApplication.Definitions;
using WebApplication.Processing;

namespace WebApplication.Job
{
    public class UpdateModelJobItem : JobItemBase
    {
        public InventorParameters Parameters { get; }

        public UpdateModelJobItem(ILogger logger, string projectId, InventorParameters parameters, ProjectWork projectWork)
            : base(logger, projectId, projectWork)
        {
            Parameters = parameters;
        }

        public override async Task ProcessJobAsync(IResultSender resultSender)
        {
            using var scope = Logger.BeginScope("Update Model ({Id})");

            Logger.LogInformation($"ProcessJob (Update) {Id} for project {ProjectId} started.");

            (ProjectStateDTO state, FdaStatsDTO stats, string reportUrl) = await ProjectWork.DoSmartUpdateAsync(Parameters, ProjectId);

            Logger.LogInformation($"ProcessJob (Update) {Id} for project {ProjectId} completed.");

            // send that we are done to client
            await resultSender.SendSuccessAsync(state, stats, reportUrl);
        }
    }
}
