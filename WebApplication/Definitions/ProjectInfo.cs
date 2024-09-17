 

namespace WebApplication.Definitions
{
    public class ProjectInfo
    {
        public string Name { get; set; }
        public string TopLevelAssembly { get; set; }

        public ProjectInfo(string NameParam = null, string TopLevelAssemblyParam = null)
        {
            Name = NameParam;
            TopLevelAssembly = TopLevelAssemblyParam;
        }
    }
}