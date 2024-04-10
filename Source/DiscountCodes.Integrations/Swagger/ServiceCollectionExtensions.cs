using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace DiscountCodes.Integrations.Swagger;

public static class ServiceCollectionExtensions
{
    public static void AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Some API v1", Version = "v1" });
            // here some other configurations maybe...
            options.AddSignalRSwaggerGen();
        });
    }

}
