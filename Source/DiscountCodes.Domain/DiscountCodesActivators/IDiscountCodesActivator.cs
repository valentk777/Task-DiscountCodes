namespace DiscountCodes.Domain.DiscountCodesActivators;

public interface IDiscountCodesActivator
{
    Task<DiscountCode> GetDiscountCode(string code);
}
