 

// Data types from this file are shared between .NET 4.7+ and netcore projects,
// so we need to have different attributes for Newtonsoft and netcore Json libraries.

#if NETCOREAPP
using JsonProperty = System.Text.Json.Serialization.JsonPropertyNameAttribute;
#else
using JsonProperty = Newtonsoft.Json.JsonPropertyAttribute;
#endif

namespace Shared
{
    /// <summary>
    /// Message severity.
    /// </summary>
    public enum Severity
    {
        Info = 0,
        Warning = 1,
        Error = 2
    }

    public class Message
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("severity")]
        public Severity Severity { get; set; }
    }
}
