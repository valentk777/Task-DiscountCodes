using DiscountCodes.Application;
using Microsoft.AspNetCore.SignalR;

namespace DiscountCodes.SignalR.Hubs;

public class DiscountHub : Hub
{
    public async Task<GenerateResponse> GenerateDiscountCode(GenerateRequest request)
    {
        await Clients.All.SendAsync();


        return null;
    }

    public async Task<UseCodeResponse> UseDiscountCode(UseCodeRequest request)
    {
        await Groups.
    }
}
