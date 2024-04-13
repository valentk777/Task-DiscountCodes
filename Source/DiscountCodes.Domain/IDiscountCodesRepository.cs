namespace DiscountCodes.Domain;

public interface IDiscountCodesRepository
{
    Task<IReadOnlyCollection<string>> GetAllDiscountCodes();

    Task<DiscountCode?> GetDiscountCode(string code);

    Task<IReadOnlyCollection<DiscountCode>> AddDiscountCodes(IReadOnlyCollection<NewDiscountCode> discountCodes);

    Task<DiscountCode> AddDiscountCode(NewDiscountCode discountCodes);

    Task<DiscountCode> UpdateDiscountCode(DiscountCode discountCode);
}
