using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiscountCodes.Domain.DiscountCodesProvider;

public class DiscountCodesProvider : IDiscountCodesProvider
{
    public async Task<DiscountCode> GetDiscountCode(string code)
    {
        //TODO: implement
        return new DiscountCode(11);
    }
}
