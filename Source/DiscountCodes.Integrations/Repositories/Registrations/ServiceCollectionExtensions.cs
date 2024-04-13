using DiscountCodes.Domain;
using DiscountCodes.Integrations.Repositories.DiscountCodes;
using DiscountCodes.Integrations.Repositories.DiscountCodes.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Serilog.Extensions.Logging;

namespace DiscountCodes.Integrations.Repositories.Registrations;

public static class ServiceCollectionExtensions
{
    public static void AddDiscountCodesRepository(this IServiceCollection serviceCollection)
    {
        serviceCollection.ConfigureOptions<DiscountCodesRepositoryOptionsSetup>();

        serviceCollection.AddDbContext<DiscountCodesDbContext>((provider, builder) =>
        {
            var databaseOptions = provider.GetService<IOptions<DiscountCodesRepositoryOptions>>()!.Value;

            builder.UseMySql(databaseOptions.ConnectionString,
                ServerVersion.AutoDetect(databaseOptions.ConnectionString),
                mySqlServerAction =>
                {
                    mySqlServerAction.EnableRetryOnFailure(databaseOptions.MaxRetryCount);
                    mySqlServerAction.CommandTimeout(databaseOptions.CommandTimeout);
                });

            builder.EnableDetailedErrors(databaseOptions.EnableDetailedErrors);
            builder.EnableSensitiveDataLogging(databaseOptions.EnableSensitiveDataLogging);
            builder.UseLoggerFactory(new SerilogLoggerFactory());
            builder.LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, databaseOptions.MinimumLevel);
        });

        serviceCollection.AddTransient<IDiscountCodesRepository, DiscountCodesRepository>();
        serviceCollection.ConfigureOptions<DiscountCodesRepositoryOptionsSetup>();
    }
}
