using DiscountCodes.Application.DiscountCode;
using DiscountCodes.Domain.DiscountCodesActivators;
using DiscountCodes.Domain.DiscountCodesGenerators;
using DiscountCodes.Integrations.Repositories.Registrations;
using Microsoft.Extensions.DependencyInjection;

namespace DiscountCodes.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddAppService(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddTransient<IDiscountCodeService, DiscountCodeService>();
        serviceCollection.AddTransient<IDiscountCodesGenerator, DiscountCodesGenerator>();
        serviceCollection.AddTransient<IDiscountCodesActivator, DiscountCodesActivator>();
        serviceCollection.AddDiscountCodesRepository();
    }
}
