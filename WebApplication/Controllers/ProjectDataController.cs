 

using System;
using System.Threading.Tasks;
using Autodesk.Forge.DesignAutomation.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication.Processing;
using WebApplication.State;
using WebApplication.Utilities;

namespace WebApplication.Controllers
{
    /// <summary>
    /// The controller serves data for default project state. (IOW - no parameter hash is used)
    /// </summary>
    [ApiController]
    public class ProjectDataController : ControllerBase
    {
        private readonly UserResolver _userResolver;
        private readonly ILogger<ProjectDataController> _logger;
        private readonly Publisher _publisher;

        public ProjectDataController(UserResolver userResolver, ILogger<ProjectDataController> logger, Publisher publisher)
        {
            _userResolver = userResolver;
            _logger = logger;
            _publisher = publisher;
        }

        [HttpGet("parameters/{projectName}")]
        public async Task<ActionResult> GetParameters(string projectName)
        {
            return await SendLocalFileContent(projectName, LocalName.Parameters);
        }

        [HttpGet("bom/{projectName}")]
        public async Task<ActionResult> GetBOM(string projectName)
        {
            return await SendLocalFileContent(projectName, LocalName.BOM);
        }

        [HttpGet("bom/{projectName}/{hash}")]
        public async Task<ActionResult> GetBOM(string projectName, string hash)
        {
            return await SendLocalFileContent(projectName, LocalName.BOM, hash);
        }
        
        /// <summary>
        /// Completion callback for FDA work items.
        /// </summary>
        /// <param name="trackerId">Tracking ID.</param>
        /// <param name="status">Workitem status.</param>
        /// <remarks>
        /// https://forge.autodesk.com/en/docs/design-automation/v3/developers_guide/callbacks/#oncomplete-callback
        /// </remarks>
        [HttpPost("complete/{trackerId}")]
        public ActionResult Complete(string trackerId, [FromBody] WorkItemStatus status)
        {
            _logger.LogInformation($"Completing {trackerId}");

            // for some reason 'time finished' is not set, so "fix" it if necessary
            status.Stats.TimeFinished ??= DateTime.UtcNow;

            _publisher.NotifyTaskIsCompleted(trackerId, status);

            return NoContent();
        }

        /// <summary>
        /// Send local file for the project.
        /// </summary>
        private async Task<ActionResult> SendLocalFileContent(string projectName, string fileName, string hash = null, string contentType = "application/json")
        {
            string localFile = await _userResolver.EnsureLocalFile(projectName, fileName, hash);
            return new PhysicalFileResult(localFile, contentType);
        }
    }
}
