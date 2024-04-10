using DiscountCodes.Integrations.Swagger;
using DiscountCodes.SignalR.Hubs;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddSignalR();
builder.Services.AddControllers();
//builder.Services.AddHttpLogging(options => _ = new HttpLoggingOptions());
builder.Services.AddSwagger();
//builder.Services.AddHealthChecks();

var app = builder.Build();


//app.UseCookiePolicy();
//app.UseHttpLogging();
app.UseRouting();
app.UseSwagger();
app.UseSwaggerUI(options => options.DisplayRequestDuration());
app.MapControllers();

app.MapHub<DiscountHub>("/Code");
//app.MapHealthChecks("heath");

app.Run();
