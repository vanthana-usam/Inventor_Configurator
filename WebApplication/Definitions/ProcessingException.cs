 

using System;

namespace WebApplication.Definitions
{
    /// <summary>
    /// Exception to report about processing problems.
    /// Use it if you want to pass a message to the client to be shown in the UI.
    /// </summary>
    public class ProcessingException : Exception
    {
        public string Title { get; }
        public string[] Messages { get; }

        public ProcessingException(string title, string[] messages)
        {
            Title = title;
            Messages = messages;
        }
    }
}
