 

using System.Collections.Generic;
using WebApplication.Definitions;

namespace WebApplication.State
{
    public class Uploads
    {
        private readonly Dictionary<string, string> _uploadFilenames;
        private readonly Dictionary<string, ProjectInfo> _uploadProjects;

        public Uploads()
        {
            _uploadFilenames = new Dictionary<string, string>();
            _uploadProjects = new Dictionary<string, ProjectInfo>();
        }

        public void AddUploadData(string uploadId, ProjectInfo projectInfo, string filename)
        {
            _uploadFilenames.Add(uploadId, filename);
            _uploadProjects.Add(uploadId, projectInfo);
        }

        public (ProjectInfo projectInfo, string filename) GetUploadData(string uploadId)
        {
            return (projectInfo: _uploadProjects[uploadId], filename: _uploadFilenames[uploadId]);
        }

        public void ClearUploadData(string uploadId)
        {
            _uploadFilenames.Remove(uploadId);
            _uploadProjects.Remove(uploadId);
        }
    }
}
