using DiscountCodes.Domain;
using DiscountCodes.Integrations.Repositories.DiscountCodes.Tables;

namespace DiscountCodes.Integrations.Repositories.DiscountCodes.Extensions;

public static class DiscountCodesTableMapperExtensions
{
    public static List<DiscountCode> ToDomain(this IReadOnlyCollection<DiscountCodesTable> source) =>
        source.Select(x => x.ToDomain()).ToList();

    public static DiscountCode ToDomain(this DiscountCodesTable source) =>
        new DiscountCode(source.Id, source.Code, source.IsUsed, source.DateGenerated);

    public static List<DiscountCodesTable> ToTable(this IReadOnlyCollection<NewDiscountCode> source) =>
        source.Select(x => x.ToTable()).ToList();

    public static DiscountCodesTable ToTable(this NewDiscountCode source) =>
        new DiscountCodesTable()
        {
            Code = source.Code,
            IsUsed = source.IsUsed,
            DateGenerated = source.DateGenerated,
            DateModified = DateTime.UtcNow,
        };

    public static List<DiscountCodesTable> ToTable(this IReadOnlyCollection<DiscountCode> source) =>
        source.Select(x => x.ToTable()).ToList();

    public static DiscountCodesTable ToTable(this DiscountCode source) =>
        new DiscountCodesTable()
        {
            Id = source.Id,
            Code = source.Code,
            IsUsed = source.IsUsed,
            DateGenerated = source.DateGenerated,
            DateModified = DateTime.UtcNow,
        };
}
