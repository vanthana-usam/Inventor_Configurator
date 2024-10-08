 

namespace WebApplication.Definitions
{
    //TODO: split the update urls and rfa urls
    public class ProcessingArgs
    {
        public string InputDocUrl { get; set; }

        /// <summary>
        /// Relative path to top level assembly in ZIP with assembly.
        /// </summary>
        public string TLA { get; set; }

        public string SvfUrl { get; set; }
        public string ParametersJsonUrl { get; set; }

        public string DrawingsListUrl { get; set; }
        public string AdoptMessagesUrl { get; set; }

        /// <summary>
        /// If job data contains assembly.
        /// </summary>
        public bool IsAssembly => ! string.IsNullOrEmpty(TLA);

        public string OutputIAMModelUrl { get; set; }
        public string OutputIPTModelUrl { get; set; }
        public string SatUrl { get; internal set; }
        public string RfaUrl { get; internal set; }
        public string BomUrl { get; set; }
        public string DrawingUrl { get; set; }
        public string DrawingPdfUrl { get; set; }
    }

    /// <summary>
    /// All data required for project adoption.
    /// </summary>
    public class AdoptionData : ProcessingArgs
    {
        public string ThumbnailUrl { get; set; }
    }

    /// <summary>
    /// All data required for project update.
    /// </summary>
    public class UpdateData : ProcessingArgs
    {
        public string InputParamsUrl { get; set; }
    }

    /// <summary>
    /// All data required for drawing pdf export.
    /// </summary>
    public class DrawingPdfData : ProcessingArgs
    {
        public string DrawingToGenerate { get; set; }
    }
}
