 

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

// TODO: This endpoint might not be needed once we solve the proper
// application shutdown, where we would eventually do the clean up
// That is potential tech debt work

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class ClearSelfController : ControllerBase
    {
        private readonly ILogger<ClearSelfController> _logger;
        Initializer _initializer;
        IConfiguration _configuration;

        public ClearSelfController(ILogger<ClearSelfController> logger, Initializer initializer, IConfiguration configuration)
        {
            _logger = logger;
            _initializer = initializer;
            _configuration = configuration;
        }

        [HttpGet("")]
        public string Clear()
        {
            if (_configuration.GetValue<bool>("allowCleanSelf"))
            {
               _logger.LogInformation("Clearing the data...");
               _initializer.ClearAsync(true).Wait();
               _logger.LogInformation("Data deleted.");
               return "{ \"Cleared\": \"true\" }";
            }
            else
               _logger.LogInformation("Self clean not allowed.");

            return "{ \"Cleared\": \"false\" }";
        }
    }
}
