 

using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using WebApplication.Services;
using WebApplication.State;

namespace WebApplication.Middleware
{
    /// <summary>
    /// Middleware to extract access token from HTTP headers.
    /// </summary>
    public class HeaderTokenHandler
    {
        private const string BearerPrefix = "Bearer ";

        private readonly RequestDelegate _next;

        public HeaderTokenHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ProfileProvider profileProvider)
        {
            while (context.Request.Headers.TryGetValue(HeaderNames.Authorization, out var values))
            {
                var headerValue = values[0];
                if (headerValue.Length <= BearerPrefix.Length) break;
                if (! headerValue.StartsWith(BearerPrefix)) break;

                string token = headerValue.Substring(BearerPrefix.Length);
                if (string.IsNullOrEmpty(token)) break;

                profileProvider.Token = token;
                break;
            }

            // Call the next delegate/middleware in the pipeline
            await _next(context);
        }
    }
}