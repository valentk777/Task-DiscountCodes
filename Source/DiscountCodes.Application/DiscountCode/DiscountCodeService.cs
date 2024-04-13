using DiscountCodes.Application.Models;
using DiscountCodes.Domain.DiscountCodesGenerator;
using DiscountCodes.Domain.DiscountCodesProvider;
using Microsoft.Extensions.Logging;

namespace DiscountCodes.Application.DiscountCode;

internal class DiscountCodeService : IDiscountCodeService
{
    private readonly ILogger<DiscountCodeService> _logger;
    private readonly IDiscountCodesGenerator _codesGenerator;
    private readonly IDiscountCodesProvider _codesProvider;

    public DiscountCodeService(ILogger<DiscountCodeService> logger, IDiscountCodesGenerator codesGenerator, IDiscountCodesProvider codesProvider)
    {
        _logger = logger;
        _codesGenerator = codesGenerator;
        _codesProvider = codesProvider;
    }

    public async Task<GenerateResponse> GenerateDiscountCode(GenerateRequest request)
    {
        _logger.LogInformation("Generating discount codes");

        var result = await _codesGenerator.GenerateCode(request.Count, request.Length);

        _logger.LogInformation("Discount codes generated");

        return new GenerateResponse { Result = result };
    }

    public async Task<UseCodeResponse> UseDiscountCode(UseCodeRequest request)
    {
        _logger.LogInformation("Trying to use discount code");

        var discountCode = await _codesProvider.GetDiscountCode(request.Code);

        return new UseCodeResponse() { Result = discountCode.Code };
    }
}
