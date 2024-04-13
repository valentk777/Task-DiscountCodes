﻿using DiscountCodes.Application.DiscountCode;
using DiscountCodes.Application.Models;
using Microsoft.AspNetCore.SignalR;
using SignalRSwaggerGen.Attributes;

[SignalRHub]
public class DiscountHub : Hub
{
    private readonly ILogger<DiscountHub> _logger;
    private readonly IDiscountCodeService _discountCodeService;

    public DiscountHub(ILogger<DiscountHub> logger, IDiscountCodeService discountCodeService)
    {
        _logger = logger;
        _discountCodeService = discountCodeService;
    }

    public async Task GenerateDiscountCode(GenerateRequest request)
    {
        _logger.LogDebug($"Calling GenerateDiscountCode with parameters Count: {request.Count} and Length {request.Length}");

        var result = await _discountCodeService.GenerateDiscountCode(request);

        await Clients.All.SendAsync("generateDiscountCodeMessageReceived", result);
    }

    //, [SignalRHidden] CancellationToken ct = default
    public async Task ValidateDiscountCode(UseCodeRequest request)
    {
        _logger.LogDebug($"Calling UseDiscountCode with parameters code: {request.Code}");

        var result = await _discountCodeService.UseDiscountCode(request);

        await Clients.All.SendAsync("validateDiscountCodeMessageReceived", result);
    }









    //public async Task ValidateDiscountCode(UseCodeRequest request)
    //{
    //    var result = new UseCodeResponse()
    //    {
    //        Result = 50
    //    };

    //    await Clients.All.SendAsync("validateDiscountCodeMessageReceived", "messageReceived", result);
    //}
    //public async Task UseDiscountCode(UseCodeRequest request)
    //{
    //    //_logger.LogDebug($"Calling UseDiscountCode with parameters code: {request.Code}");

    //    var result = new UseCodeResponse()
    //    {
    //        Result = 50
    //    };

    //    //var result = await _discountCodeService.UseDiscountCode(request);

    //    await Clients.All.SendAsync("useDiscountCodeMessageReceived", result);
    //}

    //public async Task UseDiscountCode(UseCodeRequest request)
    //{
    //    _logger.LogDebug($"Calling UseDiscountCode with parameters code: {request.Code}");

    //    var result = await _discountCodeService.UseDiscountCode(request);

    //    await Clients.All.SendAsync("useDiscountCodeMessageReceived", result);
    //}
}