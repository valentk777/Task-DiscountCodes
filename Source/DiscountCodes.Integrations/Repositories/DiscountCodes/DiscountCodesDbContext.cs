using DiscountCodes.Integrations.Constants;
using DiscountCodes.Integrations.Repositories.DiscountCodes.Tables;
using Microsoft.EntityFrameworkCore;

namespace DiscountCodes.Integrations.Repositories.DiscountCodes;

public class DiscountCodesDbContext : DbContext
{
    public DiscountCodesDbContext(DbContextOptions<DiscountCodesDbContext> options)
        : base(options)
    {
    }

    public DbSet<DiscountCodesTable> DiscountCodes { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder) => ConfigureUserTable(modelBuilder);

    internal static void ConfigureUserTable(ModelBuilder modelBuilder) => modelBuilder.Entity<DiscountCodesTable>(entity =>
                                                                               {
                                                                                   entity.ToTable(IntegrationConstants.DiscountCodesTable);
                                                                               });
}
