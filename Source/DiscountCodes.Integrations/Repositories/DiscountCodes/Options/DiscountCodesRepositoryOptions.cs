using DiscountCodes.Integrations.Constants;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace DiscountCodes.Integrations.Repositories.DiscountCodes.Options;

[ExcludeFromCodeCoverage]
public class DiscountCodesRepositoryOptions
{
    public const string SectionName = IntegrationConstants.DiscountCodesRepositoryOptions;

    [MinLength(1)]
    public string ConnectionString { get; set; } = string.Empty;

    [Range(0, 10)]
    public int MaxRetryCount { get; set; }

    public int CommandTimeout { get; set; }
    public bool EnableDetailedErrors { get; set; }
    public bool EnableSensitiveDataLogging { get; set; }
    public LogLevel MinimumLevel { get; set; }
}
