﻿ 

using WebApplication.Definitions;

namespace WebApplication.Processing
{
    /// <summary>
    /// Generate PNG thumbnail for Inventor document.
    /// </summary>
    public class CreateThumbnail : ForgeAppBase
    {
        public override string Id => nameof(CreateThumbnail);
        public override string Description => "Generate thumbnail from Inventor document";

        protected override string OutputUrl(ProcessingArgs projectData)
        {
            return (projectData as AdoptionData).ThumbnailUrl; // TODO: use generics
        }

        protected override string OutputName => "thumbnail.png";

        /// <summary>
        /// Constructor.
        /// </summary>
        public CreateThumbnail(Publisher publisher) : base(publisher) { }
    }
}
