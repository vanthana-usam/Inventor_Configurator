 

using System.Threading.Tasks;

namespace WebApplication.Job
{
    /// <summary>
    /// Interface to send results back.
    /// </summary>
    public interface IResultSender
    {
        Task SendSuccessAsync();
        Task SendSuccessAsync(object arg0);
        Task SendSuccessAsync(object arg0, object arg1);
        Task SendSuccessAsync(object arg0, object arg1, object arg2);

        /// <summary>
        /// Send information about failed processing.
        /// </summary>
        /// <param name="jobId">ID of the job.</param> // TODO: is it useful?
        /// <param name="error">Error details</param>
        Task SendErrorAsync(ProcessingError error);
    }
}
