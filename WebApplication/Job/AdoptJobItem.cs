 

using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using WebApplication.Processing;
using WebApplication.State;
using WebApplication.Definitions;
using WebApplication.Utilities;
using System.IO;
using System.Text.RegularExpressions;

namespace WebApplication.Job
{
    internal class AdoptJobItem : JobItemBase
    {
        private readonly ProjectInfo _projectInfo;
        private readonly string _fileName;
        private readonly UserResolver _userResolver;
        private readonly DtoGenerator _dtoGenerator;

        public AdoptJobItem(ILogger logger, ProjectInfo projectInfo, string fileName, ProjectWork projectWork, DtoGenerator dtoGenerator, UserResolver userResolver)
            : base(logger, null, projectWork)
        {
            _projectInfo = projectInfo;
            _fileName = fileName;
            _dtoGenerator = dtoGenerator;
            _userResolver = userResolver;
        }

        public override async Task ProcessJobAsync(IResultSender resultSender)
        {
            using var scope = Logger.BeginScope($"Project Adoption ({Id})");

            Logger.LogInformation($"ProcessJob (Adopt) {Id} for project {_projectInfo.Name} started.");

            // Check for valid project and root names (where applicable)
            if ((!string.IsNullOrEmpty(_projectInfo.TopLevelAssembly) && Regex.Match(_projectInfo.TopLevelAssembly, @"[\uFFF0-\uFFFF]").Success) ||
                Regex.Match(_projectInfo.Name, @"[\uFFF0-\uFFFF]").Success) 
            {
                Logger.LogInformation($"Replacement charcters found in project name or top level assembly name for job {Id}.");

                throw new ProcessingException("Project name or assembly contains unsupported characters", 
                    new[] { "Please refer to https://github.com/autodesk-platform-services/aps-configurator-inventor/blob/master/README.md#project-file-zip-encoding" });
            }

            // upload the file to OSS
            var bucket = await _userResolver.GetBucketAsync(tryToCreate: true);
            ProjectStorage projectStorage = await _userResolver.GetProjectStorageAsync(_projectInfo.Name);

            string ossSourceModel = projectStorage.Project.OSSSourceModel;

            await bucket.SmartUploadAsync(_fileName, ossSourceModel);

            // cleanup before adoption
            File.Delete(_fileName);

            // adopt the project
            bool adopted = false;
            FdaStatsDTO stats;
            string reportUrl = null;
            try
            {
                string signedUploadedUrl = await bucket.CreateSignedUrlAsync(ossSourceModel);

                (stats, reportUrl) = await ProjectWork.AdoptAsync(_projectInfo, signedUploadedUrl);
                adopted = true;
            }
            finally
            {
                // on any failure during adoption we consider that project adoption failed and it's not usable
                if (!adopted)
                {
                    Logger.LogInformation($"Adoption failed. Removing '{ossSourceModel}' OSS object.");
                    await bucket.DeleteObjectAsync(ossSourceModel);
                }
            }

            Logger.LogInformation($"ProcessJob (Adopt) {Id} for project {_projectInfo.Name} completed.");
            await resultSender.SendSuccessAsync(_dtoGenerator.ToDTO(projectStorage), stats, reportUrl);
        }
    }
}