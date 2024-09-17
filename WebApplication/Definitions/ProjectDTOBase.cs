 

namespace WebApplication.Definitions
{
    /// <summary>
    /// Common pieces for project-related DTOs
    /// </summary>
    public class ProjectDTOBase
    {
        /// <summary>
        /// URL to SVF directory.
        /// </summary>
        public string Svf { get; set; }

        /// <summary>
        /// URL to BOM JSON.
        /// </summary>
        public string BomJsonUrl { get; set; }

        /// <summary>
        /// URL to download BOM CSV.
        /// </summary>
        public string BomDownloadUrl { get; set; }

        /// <summary>
        /// URL to download current model
        /// </summary>
        public string ModelDownloadUrl { get; set; }

        /// <summary>
        /// Parameters hash
        /// </summary>
        public string Hash { get; set; }
    }
}
