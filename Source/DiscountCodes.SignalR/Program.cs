
using DiscountCodes.Application.Extensions;
using DiscountCodes.Integrations.Swagger;
using DiscountCodes.SignalR.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddAppService();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("reactApp", builder =>
    {
        builder
        .AllowAnyMethod()
        .AllowAnyHeader()
         .SetIsOriginAllowed(origin => true)
        //.WithOrigins("http://localhost:3000")
        .AllowCredentials();
    });
});

builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseCors("reactApp");

app.UseSwagger();
app.UseSwaggerUI(options => options.DisplayRequestDuration());

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.MapHub<DiscountHub>("/hub");

app.Run();
