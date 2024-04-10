using DiscountCodes.Application.Models;
using Microsoft.AspNetCore.SignalR;
using SignalRSwaggerGen.Attributes;

namespace DiscountCodes.SignalR.Hubs;

[SignalRHub]
public class DiscountHub : Hub
{
    public DiscountHub()
    {
    }

    public async Task<GenerateResponse> GenerateDiscountCode(int number, [SignalRHidden] CancellationToken ct = default)
    {


        await Clients.All.SendAsync("ReceiveGenerateDiscountCodeResult", true, ct);

        return null;
    }

    public async Task<UseCodeResponse> UseDiscountCode(string code, [SignalRHidden] CancellationToken ct = default)
    {
        var response = new UseCodeResponse()
        {
            Result = 0
        };

        await Clients.All.SendAsync("ReceiveUseDiscountCodeResult", response, ct);

        return null;
    }


    //public async Task<GenerateResponse> GenerateDiscountCode(GenerateRequest request)
    //{
    //    var response = new GenerateResponse() {
    //        Result = true };

    //    await Clients.All.SendAsync("ReceiveGenerateDiscountCodeResult", response);

    //    return null;
    //}

    //public async Task<UseCodeResponse> UseDiscountCode(UseCodeRequest request)
    //{
    //    var response = new UseCodeResponse()
    //    {
    //        Result = 0
    //    };

    //    await Clients.All.SendAsync("ReceiveUseDiscountCodeResult", response);

    //    return null;
    //}
}
