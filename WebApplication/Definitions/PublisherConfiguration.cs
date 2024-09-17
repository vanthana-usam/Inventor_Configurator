 

namespace WebApplication.Definitions
{
    public enum CompletionCheck
    {
        /// <summary>
        /// Use polling (ask about status periodically).
        /// </summary>
        Polling,

        /// <summary>
        /// Use callback URL to get notification from FDA servers.
        /// </summary>
        Callback
    }

    public class PublisherConfiguration
    {
        /// <summary>
        /// How publisher should check for completion.
        /// </summary>
        public CompletionCheck CompletionCheck { get; set; } = CompletionCheck.Polling;

        private string callbackUrlBase;

        /// <summary>
        /// Base URL for callback.
        /// </summary>
        public string CallbackUrlBase
        {
            get
            {
                return callbackUrlBase + "/";
            }
            set
            {
                callbackUrlBase = value;
            }
        }
    }
}