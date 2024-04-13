﻿using DiscountCodes.Application.DiscountCode;
using DiscountCodes.Domain.DiscountCodesGenerator;
using DiscountCodes.Domain.DiscountCodesProvider;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DiscountCodes.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddAppService(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddTransient<IDiscountCodeService, DiscountCodeService>();
        serviceCollection.AddTransient<IDiscountCodesGenerator, DiscountCodesGenerator>();
        serviceCollection.AddTransient<IDiscountCodesProvider, DiscountCodesProvider>();
    }
}
