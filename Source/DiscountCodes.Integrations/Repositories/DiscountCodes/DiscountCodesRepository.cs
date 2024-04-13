using DiscountCodes.Domain;
using DiscountCodes.Domain.Exceptions;
using DiscountCodes.Integrations.Repositories.DiscountCodes.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DiscountCodes.Integrations.Repositories.DiscountCodes;

public class DiscountCodesRepository : IDiscountCodesRepository
{
    private readonly ILogger<DiscountCodesRepository> _logger;
    private readonly DiscountCodesDbContext _dbContext;

    public DiscountCodesRepository(ILogger<DiscountCodesRepository> logger, DiscountCodesDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyCollection<string>> GetAllDiscountCodes()
    {
        var discountCodes = await _dbContext.DiscountCodes.AsNoTracking().Select(x => x.Code).ToListAsync();

        return discountCodes;
    }

    public async Task<DiscountCode?> GetDiscountCode(string code)
    {
        var discountCode = await _dbContext.DiscountCodes.AsNoTracking().SingleOrDefaultAsync(x => x.Code == code);

        return discountCode?.ToDomain();
    }

    public async Task<IReadOnlyCollection<DiscountCode>> AddDiscountCodes(IReadOnlyCollection<NewDiscountCode> discountCodes)
    {
        var discountCodesTable = discountCodes.Select(x => x.ToTable());

        _dbContext.DiscountCodes.AddRange(discountCodesTable);

        var numberOfRows = await _dbContext.SaveChangesAsync();

        _logger.LogDebug("{numberOfRows} in discount code table added", numberOfRows);

        return discountCodesTable.Select(x => x.ToDomain()).ToList();
    }

    public async Task<DiscountCode> AddDiscountCode(NewDiscountCode discountCodes)
    {
        var oldCode = GetDiscountCode(discountCodes.Code);

        if (oldCode is not null)
        {
            throw new DomainValidationException("Code should be unique");
        }

        var discountCodesTable = discountCodes.ToTable();

        _dbContext.DiscountCodes.Add(discountCodesTable);

        var numberOfRows = await _dbContext.SaveChangesAsync();

        _logger.LogDebug("{numberOfRows} in discount code table added", numberOfRows);

        return discountCodesTable.ToDomain();
    }

    public async Task<DiscountCode> UpdateDiscountCode(DiscountCode discountCode)
    {
        var code = await _dbContext.DiscountCodes.SingleOrDefaultAsync(x => x.Id == discountCode.Id);

        if (code is null)
        {
            throw new DomainValidationException("Cannot find code");
        }

        code.IsUsed = discountCode.IsUsed;
        code.DateModified = DateTime.UtcNow;

        var numberOfRows = await _dbContext.SaveChangesAsync();

        _logger.LogDebug("{numberOfRows} in discount code table updated", numberOfRows);

        return code.ToDomain();
    }
}
