using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscountCodes.Integrations.Repositories.DiscountCodes.Tables;

[Index(nameof(Code))]
public class DiscountCodesTable
{
    [Key]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 0)]
    public int Id { get; set; }

    [Required]
    [MaxLength(8, ErrorMessage = "Maximum lenght of code should be no more than 8")]
    [Column(Order = 1)]
    public string Code { get; set; } = string.Empty;

    [Required]
    [Column(Order = 2)]
    public bool IsUsed { get; set; } = false;

    [Required]
    [Column(Order = 3)]
    public DateTime DateGenerated { get; set; }

    [Required]
    [Column(Order = 4)]
    public DateTime DateModified { get; set; }
}
