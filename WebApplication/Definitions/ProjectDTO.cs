 

using System;
using Shared;

namespace WebApplication.Definitions
{
    public class ProjectDTO : ProjectDTOBase
    {
        public string Id { get; set; }
        public string Label { get; set; }

        /// <summary>
        /// Thumbnail URL.
        /// </summary>
        public string Image { get; set; }

        /// <summary>
        /// If project is assembly.
        /// </summary>
        public bool IsAssembly { get; set; }
        
        /// <summary>
        /// If project has drawings
        /// </summary>
        [Obsolete]
        public bool HasDrawing { get; set; }

        /// <summary>
        /// URL to DrawingsList JSON.
        /// </summary>
        public string DrawingsListUrl { get; set; }

        /// <summary>
        /// Adoption messages.
        /// </summary>
        public string[] AdoptWarnings { get; set; }
    }
}
