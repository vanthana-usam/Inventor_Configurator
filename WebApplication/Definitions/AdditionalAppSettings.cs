 

using System;

namespace WebApplication.Definitions
{
    // Strongly typed classes for settings defined in appsettings.json to be deserialized to

    public class AppBundleZipPaths
    {
        public string EmptyExe { get; set; }
        public string DataChecker { get; set; }
        public string CreateSVF { get; set; }
        public string CreateThumbnail { get; set; }
        public string ExtractParameters { get; set; }
        public string UpdateParameters { get; set; }
        public string CreateSAT { get; set; }
        public string CreateRFA { get; set; }
        public string CreateBOM { get; set; }
        public string ExportDrawing { get; set; }
        public string UpdateDrawings { get; set; }
    }

    public class DefaultProjectsConfiguration
    {
        public DefaultProjectConfiguration[] Projects { get; set; } = Array.Empty<DefaultProjectConfiguration>();
    }

    public class DefaultProjectConfiguration : ProjectInfo
    {
        public string Url { get; set; }
    }

    public class InviteOnlyModeConfiguration
    {
        public bool Enabled { get; set; }
        public string[] Domains { get; set; }
        public string[] Addresses { get; set; }
    }

    /// <summary>
    /// Save work item processing reports.
    /// </summary>
    public enum SaveReport
    {
        /// <summary>
        /// Don't save anything.
        /// </summary>
        Off,

        /// <summary>
        /// Save reports for failed processings.
        /// </summary>
        ErrorsOnly,

        /// <summary>
        /// Save everything.
        /// </summary>
        All
    }

    /// <summary>
    /// FDA processing options.
    /// </summary>
    public class ProcessingOptions
    {
        /// <summary>
        /// If reports should be saved.
        /// </summary>
        public SaveReport SaveReport { get; set; } = SaveReport.ErrorsOnly;
    }
}
