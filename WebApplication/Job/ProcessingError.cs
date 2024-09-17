 

using System.Collections.Generic;

namespace WebApplication.Job
{
    public enum ErrorInfoType
    {
        Unknown = 0,
        ReportUrl = 1,
        Messages = 2
    }

    public abstract class ProcessingError
    {
        public abstract ErrorInfoType ErrorType { get; }
        public string JobId { get; }

        protected ProcessingError(string jobId)
        {
            JobId = jobId;
        }
    }

    public class ReportUrlError : ProcessingError
    {
        public override ErrorInfoType ErrorType { get; } = ErrorInfoType.ReportUrl;

        public string ReportUrl { get; }

        public ReportUrlError(string jobId, string reportUrl) : base(jobId)
        {
            ReportUrl = reportUrl;
        }
    }

    public class MessagesError : ProcessingError
    {
        public override ErrorInfoType ErrorType { get; } = ErrorInfoType.Messages;

        public string Title { get; }
        public IEnumerable<string> Messages { get; }

        public MessagesError(string jobId, string title, IEnumerable<string> messages) : base(jobId)
        {
            Title = title;
            Messages = messages;
        }
    }
}
