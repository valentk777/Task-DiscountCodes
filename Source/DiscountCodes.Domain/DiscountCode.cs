namespace DiscountCodes.Domain;

public record DiscountCode(int Id, string Code, bool IsUsed, DateTime DateGenerated);
