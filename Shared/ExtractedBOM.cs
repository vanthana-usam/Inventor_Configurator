 

// Data types from this file are shared between .NET 4.7+ and netcore projects,
// so we need to have different attributes for Newtonsoft and netcore Json libraries.

#if NETCOREAPP
using JsonProperty = System.Text.Json.Serialization.JsonPropertyNameAttribute;
#else
using JsonProperty = Newtonsoft.Json.JsonPropertyAttribute;
#endif

namespace Shared
{
    public class Column
    {
        [JsonProperty("label")]
        public string Label { get; set; }

        [JsonProperty("numeric")]
        public bool? Numeric { get; set; }
    }

    public class ExtractedBOM
    {
        [JsonProperty("columns")]
        public Column[] Columns { get; set; }

        [JsonProperty("data")]
        public object[][] Data { get; set; }
    }
}
