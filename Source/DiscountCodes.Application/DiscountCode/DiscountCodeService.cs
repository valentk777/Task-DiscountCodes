using DiscountCodes.Application.Models;
using DiscountCodes.Domain.DiscountCodesActivators;
using DiscountCodes.Domain.DiscountCodesGenerators;
using Microsoft.Extensions.Logging;

namespace DiscountCodes.Application.DiscountCode;

public class DiscountCodeService : IDiscountCodeService
{
    private readonly ILogger<DiscountCodeService> _logger;
    private readonly IDiscountCodesGenerator _codesGenerator;
    private readonly IDiscountCodesActivator _codesProvider;

    public DiscountCodeService(ILogger<DiscountCodeService> logger,
        IDiscountCodesGenerator codesGenerator,
        IDiscountCodesActivator codesProvider)
    {
        _logger = logger;
        _codesGenerator = codesGenerator;
        _codesProvider = codesProvider;
    }

    public async Task<GenerateResponse> GenerateDiscountCode(GenerateRequest request)
    {
        _logger.LogInformation("Generating discount codes");

        var result = await _codesGenerator.GenerateCodes(request.Count, request.Length);

        _logger.LogInformation("Discount codes generated");

        return new GenerateResponse { Result = result };
    }

    public async Task<UseCodeResponse> UseDiscountCode(UseCodeRequest request)
    {
        _logger.LogInformation("Trying to use discount code");

        try
        {
            await _codesProvider.GetDiscountCode(request.Code);

            return new UseCodeResponse() { Result = 1 };
        }
        catch (Exception exception)
        {
            _logger.LogError("Error in using discount code. {exception}", exception);

            return new UseCodeResponse() { Result = 0 };
        }
    }
}
