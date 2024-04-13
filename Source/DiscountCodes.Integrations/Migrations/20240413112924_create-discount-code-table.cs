using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiscountCodes.Integrations.Migrations;

/// <inheritdoc />
public partial class creatediscountcodetable : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterDatabase()
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
            name: "DiscountCodesTable",
            columns: table => new
            {
                Id = table.Column<int>(type: "int", nullable: false)
                    .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                Code = table.Column<string>(type: "varchar(8)", maxLength: 8, nullable: false)
                    .Annotation("MySql:CharSet", "utf8mb4"),
                IsUsed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                DateGenerated = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                DateModified = table.Column<DateTime>(type: "datetime(6)", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_DiscountCodesTable", x => x.Id);
            })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            name: "IX_DiscountCodesTable_Code",
            table: "DiscountCodesTable",
            column: "Code");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "DiscountCodesTable");
    }
}
