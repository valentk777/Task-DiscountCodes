namespace DiscountCodes.Domain;

public record NewDiscountCode(string Code, bool IsUsed, DateTime DateGenerated);
