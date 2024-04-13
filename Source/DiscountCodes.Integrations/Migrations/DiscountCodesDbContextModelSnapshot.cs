﻿// <auto-generated />
using System;
using DiscountCodes.Integrations.Repositories.DiscountCodes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DiscountCodes.Integrations.Migrations;

[DbContext(typeof(DiscountCodesDbContext))]
partial class DiscountCodesDbContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
        modelBuilder
            .HasAnnotation("ProductVersion", "8.0.3")
            .HasAnnotation("Relational:MaxIdentifierLength", 64);

        MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

        modelBuilder.Entity("DiscountCodes.Integrations.Repositories.DiscountCodes.Tables.DiscountCodesTable", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int")
                    .HasColumnOrder(0);

                MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                b.Property<string>("Code")
                    .IsRequired()
                    .HasMaxLength(8)
                    .HasColumnType("varchar(8)")
                    .HasColumnOrder(1);

                b.Property<DateTime>("DateGenerated")
                    .HasColumnType("datetime(6)")
                    .HasColumnOrder(3);

                b.Property<DateTime>("DateModified")
                    .HasColumnType("datetime(6)")
                    .HasColumnOrder(4);

                b.Property<bool>("IsUsed")
                    .HasColumnType("tinyint(1)")
                    .HasColumnOrder(2);

                b.HasKey("Id");

                b.HasIndex("Code");

                b.ToTable("DiscountCodesTable", (string)null);
            });
#pragma warning restore 612, 618
    }
}
