 

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MigrationApp
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly Migration _migration;

        public Worker(Migration migration, ILogger<Worker> logger)
        {
            _migration = migration;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await MigrateAll();
                }
                catch(Exception e)
                {
                    _logger.LogError(e, "Fatal error during migration process !!!");
                }

                await Task.Delay(1000, stoppingToken);
            }
        }

        private async Task MigrateAll()
        {
            _logger.LogInformation("Scanning buckets for migration");
            List<MigrationJob> adoptJobs = new List<MigrationJob>();
            List<MigrationJob> configJobs = new List<MigrationJob>();
            await _migration.ScanBuckets(adoptJobs, configJobs);
            _logger.LogInformation($"Migration is performing {adoptJobs.Count + configJobs.Count} operations");
            await _migration.Migrate(adoptJobs, configJobs);
            _logger.LogInformation("Migration finished");
        }
    }
}
