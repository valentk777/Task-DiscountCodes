using DiscountCodes.Domain.Exceptions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Diagnostics.CodeAnalysis;

namespace DiscountCodes.Integrations.Repositories.DiscountCodes.Options;

[ExcludeFromCodeCoverage]
public class DiscountCodesRepositoryOptionsSetup : IConfigureOptions<DiscountCodesRepositoryOptions>
{
    private readonly IConfiguration _configuration;

    public DiscountCodesRepositoryOptionsSetup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void Configure(DiscountCodesRepositoryOptions options)
    {
        _configuration.GetSection(DiscountCodesRepositoryOptions.SectionName).Bind(options);

        if (string.IsNullOrWhiteSpace(options.ConnectionString))
        {
            throw new DomainValidationException("Connections string is null or empty");
        }
    }
}
