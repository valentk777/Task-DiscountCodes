using DiscountCodes.Application.Models;

namespace DiscountCodes.Application.DiscountCode;

public interface IDiscountCodeService
{
    Task<GenerateResponse> GenerateDiscountCode(GenerateRequest request);

    Task<UseCodeResponse> UseDiscountCode(UseCodeRequest request);
}
