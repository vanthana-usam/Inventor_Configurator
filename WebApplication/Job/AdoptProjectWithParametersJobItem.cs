 

using System;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using WebApplication.Definitions;
using WebApplication.Services;

namespace WebApplication.Job
{
    internal class AdoptProjectWithParametersJobItem : JobItemBase
    {
        private readonly ProjectService _projectService;
        private readonly string _payloadUrl;
        private readonly AdoptProjectWithParametersPayloadProvider _adoptProjectWithParametersPayloadProvider;

        public AdoptProjectWithParametersJobItem(ILogger logger, ProjectService projectService, string payloadUrl, 
            AdoptProjectWithParametersPayloadProvider adoptProjectWithParametersPayloadProvider)
            : base(logger, null, null)
        {
            _projectService = projectService;
            _payloadUrl = payloadUrl;
            _adoptProjectWithParametersPayloadProvider = adoptProjectWithParametersPayloadProvider;
        }

        public override async Task ProcessJobAsync(IResultSender resultSender)
        {
            using var scope = Logger.BeginScope("Project Adoption ({Id})");

                var payload = await _adoptProjectWithParametersPayloadProvider.GetParametersAsync(_payloadUrl);

                Logger.LogInformation($"ProcessJob (AdoptProjectWithParameters) {Id} for project {payload.Name} started.");

                var projectWithParameters = await _projectService.AdoptProjectWithParametersAsync(payload);

                Logger.LogInformation($"ProcessJob (AdoptProjectWithParameters) {Id} for project {payload.Name} completed.");

                await resultSender.SendSuccessAsync(projectWithParameters);
        }
    }
}