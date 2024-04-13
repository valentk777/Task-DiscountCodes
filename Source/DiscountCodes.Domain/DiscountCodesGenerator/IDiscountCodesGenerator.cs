namespace DiscountCodes.Domain.DiscountCodesGenerator;

public interface IDiscountCodesGenerator
{
    Task<bool> GenerateCode(ushort count, byte length);
}
