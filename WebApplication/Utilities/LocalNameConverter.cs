 

using System.IO;

namespace WebApplication.Utilities
{
    /// <summary>
    /// Convert relative filenames to fullnames.
    /// </summary>
    public class LocalNameConverter
    {
        public string BaseDir { get; }

        public LocalNameConverter(string baseDir)
        {
            BaseDir = baseDir;
        }

        /// <summary>
        /// Generate full local name for the filename.
        /// </summary>
        public string ToFullName(string fileName)
        {
            return Path.Combine(BaseDir, fileName);
        }
    }

    /// <summary>
    /// Local attribute files.
    /// </summary>
    public class LocalAttributes : LocalNameConverter
    {
        /// <summary>
        /// Filename for thumbnail image.
        /// </summary>
        public string Thumbnail => ToFullName(LocalName.Thumbnail);

        /// <summary>
        /// Filename of JSON file with project metadata.
        /// </summary>
        public string Metadata => ToFullName(LocalName.Metadata);

        /// <summary>
        /// Filename of JSON file with drawing names in the project.
        /// </summary>
        public string DrawingsList => ToFullName(LocalName.DrawingsList);

        /// <summary>
        /// Filename of JSON file with adoption messages.
        /// </summary>
        public string AdoptMessages => ToFullName(LocalName.AdoptMessages);

        public LocalAttributes(string rootDir, string projectDir) : base(Path.Combine(rootDir, projectDir))
        {
        }
    }

    /// <summary>
    /// Names for "hashed" files.
    /// </summary>
    public class LocalNameProvider : LocalNameConverter
    {
        /// <summary>
        /// Fullname of directory with SVF data.
        /// </summary>
        public string SvfDir => ToFullName(LocalName.SvfDir);

        /// <summary>
        /// Filename for JSON with Inventor document parameters.
        /// </summary>
        public string Parameters => ToFullName(LocalName.Parameters);

        /// <summary>
        /// Filename for JSON with BOM.
        /// </summary>
        public string BOM => ToFullName(LocalName.BOM);

        /// <summary>
        /// Filename for JSON with DrawingsList.
        /// </summary>
        public string DrawingsList => ToFullName(LocalName.DrawingsList);

        public LocalNameProvider(string projectDir, string hash) : base(Path.Combine(projectDir, hash))
        {
        }
    }
}
