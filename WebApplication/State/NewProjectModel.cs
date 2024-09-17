 

using Microsoft.AspNetCore.Http;

namespace WebApplication.State
{
    public class NewProjectModel
    {
        public string root {get; set;}
        public IFormFile package { get; set; }
    }
}
