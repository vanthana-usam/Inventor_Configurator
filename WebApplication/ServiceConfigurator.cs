using System.Text.Json.Serialization;
using Autodesk.Forge.Core;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.DependencyInjection;
using WebApplication.Definitions;
using WebApplication.Processing;
using WebApplication.Services;
using WebApplication.Utilities;
using Microsoft.Extensions.Configuration;
using Autodesk.Forge.DesignAutomation;
using WebApplication.Middleware;
using WebApplication.State;
using MigrationApp;

namespace WebApplication
{
    public class ServiceConfigurator
    {
        private const string ForgeSectionKey = "Forge";
        private const string AppBundleZipPathsKey = "AppBundleZipPaths";
        private const string DefaultProjectsSectionKey = "DefaultProjects";
        private const string InviteOnlyModeKey = "InviteOnlyMode";
        private const string ProcessingOptionsKey = "Processing";
        private const string PublisherOptionsKey = "Publisher";

        public static void ConfigureServices(IConfiguration Configuration, IServiceCollection services)
        {
            services
                .AddControllersWithViews()
                .AddJsonOptions(options =>
                                {
                                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                                    options.JsonSerializerOptions.IgnoreNullValues = true;
                                });

            services.AddSignalR(o =>
            {
                o.EnableDetailedErrors = true;
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddHttpClient();

            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = 1000 * 1024 * 1024;
                x.MultipartBodyLengthLimit = 1000 * 1024 * 1024; // default was 134217728, 1000000000 is enough due to FDA quotas (1000 MB uncompressed size)
            });

            // NOTE: eventually we might want to use `AddForgeService()`, but right now it might break existing stuff
            // https://github.com/Autodesk-Forge/forge-api-dotnet-core/blob/master/src/Autodesk.Forge.Core/ServiceCollectionExtensions.cs
            services
                .Configure<ForgeConfiguration>(Configuration.GetSection(ForgeSectionKey))
                .Configure<AppBundleZipPaths>(Configuration.GetSection(AppBundleZipPathsKey))
                .Configure<DefaultProjectsConfiguration>(Configuration.GetSection(DefaultProjectsSectionKey))
                .Configure<InviteOnlyModeConfiguration>(Configuration.GetSection(InviteOnlyModeKey))
                .Configure<ProcessingOptions>(Configuration.GetSection(ProcessingOptionsKey))
                .Configure<PublisherConfiguration>(Configuration.GetSection(PublisherOptionsKey));

            services.AddSingleton<IResourceProvider, ResourceProvider>();
            services.AddSingleton<IPostProcessing, PostProcessing>();
            services.AddSingleton<IForgeOSS, ForgeOSS>();
            services.AddSingleton<FdaClient>();
            services.AddTransient<Initializer>();
            services.AddTransient<Arranger>();
            services.AddTransient<ProjectWork>();
            services.AddTransient<DtoGenerator>();
            services.AddSingleton<ITaskUtil, TaskUtil>();
            
            services.AddDesignAutomation(Configuration);
            
            services.AddSingleton<Publisher>();
            services.AddSingleton<BucketPrefixProvider>();
            services.AddSingleton<LocalCache>();
            services.AddSingleton<Uploads>();
            services.AddSingleton<OssBucketFactory>();
            services.AddSingleton<AdoptProjectWithParametersPayloadProvider>();
            services.AddSingleton<IGuidGenerator, GuidGenerator>();

            if (Configuration.GetValue<bool>("migration"))
            {
                services.AddHostedService<Worker>();
                services.AddScoped<MigrationBucketKeyProvider>();
                services.AddScoped<IBucketKeyProvider>(provider =>
                {
                    return provider.GetService<MigrationBucketKeyProvider>();
                });
                services.AddScoped<UserResolver>();
                services.AddSingleton<ProfileProvider>();
                services.AddSingleton<Migration>();
                services.AddScoped<MigrationJob>();
                services.AddScoped<ProjectService>();
            }
            else
            {
                services.AddScoped<IBucketKeyProvider, LoggedInUserBucketKeyProvider>();
                services.AddScoped<UserResolver>();
                services.AddScoped<ProfileProvider>();
                services.AddScoped<ProjectService>();
            }          
        }
    }
}