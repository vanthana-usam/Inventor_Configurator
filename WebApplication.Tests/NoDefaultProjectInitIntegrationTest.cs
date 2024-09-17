 

using System.IO;
using System.Threading.Tasks;
using WebApplication.Definitions;
using Xunit;

namespace WebApplication.Tests
{
    // This initialization test cannot run in parallel because it touches the same files as other init test
    // leading to a small chance of file access collision 
    [Collection("IntegrationTests1")]
    public class NoDefaultProjectInitIntegrationTest : InitializerTestBase, IAsyncLifetime
    {
        private static readonly DefaultProjectsConfiguration defaultProjectsConfiguration = new DefaultProjectsConfiguration();

        public NoDefaultProjectInitIntegrationTest() : base(defaultProjectsConfiguration)
        {}

        public async Task DisposeAsync()
        {
            await initializer.ClearAsync(false);
        }

        public async Task InitializeAsync()
        {
            await initializer.ClearAsync(false);
        }

        [Fact]
        public async void NoDefaultProjectInitTestAsync()
        {
            // Init the project with no default project as this would previously fail with a null reference exception
            // while iterating the default projects
            await initializer.InitializeAsync();
            // Secondary defect from the first one caused the local cache directory to be removed during clear - init - run sequence in one go
            Assert.True(Directory.Exists(localCache.LocalRootName));
        }
    }
}
