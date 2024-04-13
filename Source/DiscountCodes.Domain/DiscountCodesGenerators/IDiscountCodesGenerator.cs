namespace DiscountCodes.Domain.DiscountCodesGenerators;

public interface IDiscountCodesGenerator
{
    Task<bool> GenerateCodes(ushort count, byte length);
}
