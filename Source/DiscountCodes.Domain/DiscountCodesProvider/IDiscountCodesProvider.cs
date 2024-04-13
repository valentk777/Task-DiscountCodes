using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiscountCodes.Domain.DiscountCodesProvider;

public interface IDiscountCodesProvider
{
    Task<DiscountCode> GetDiscountCode(string code);
}
