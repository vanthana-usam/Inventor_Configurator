 

using System.Collections.Generic;
using Autodesk.Forge.DesignAutomation.Model;

namespace WebApplication.Definitions
{
    public class ProcessingResult
    {
        public bool Success { get; set; }
        public string ReportUrl { get; set; }
        public string ErrorMessage { get; set; }

        public List<Statistics> Stats { get; set; } = new List<Statistics>();

        public ProcessingResult(Statistics statistics)
        {
            Stats.Add(statistics);
        }
    }
}
