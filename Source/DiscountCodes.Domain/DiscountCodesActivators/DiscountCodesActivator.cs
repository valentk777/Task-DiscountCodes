using DiscountCodes.Domain.Exceptions;
using Microsoft.Extensions.Logging;

namespace DiscountCodes.Domain.DiscountCodesActivators;

public class DiscountCodesActivator : IDiscountCodesActivator
{
    private readonly ILogger<DiscountCodesActivator> _logger;
    private readonly IDiscountCodesRepository _repository;

    public DiscountCodesActivator(ILogger<DiscountCodesActivator> logger, IDiscountCodesRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    public async Task<DiscountCode> GetDiscountCode(string code)
    {
        var discountCode = await _repository.GetDiscountCode(code);

        if (discountCode is null)
        {
            _logger.LogInformation("Cannot find provided code");

            throw new DomainValidationException("Cannot find provided code");
        }

        if (discountCode.IsUsed)
        {
            _logger.LogInformation("Provided code has been used already");

            throw new DomainValidationException("Provided code has been used already");
        }

        var updatedDiscountCode = await _repository.UpdateDiscountCode(discountCode with { IsUsed = true });

        return updatedDiscountCode;
    }
}
