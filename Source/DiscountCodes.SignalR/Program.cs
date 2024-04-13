
using DiscountCodes.Application.Extensions;
using DiscountCodes.Integrations.Swagger;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

//TODO: move to resources and constants
builder.Services.AddSignalR();

builder.Services.AddAppService();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger();

//builder.Services.AddCors(opt =>
//{
//    opt.AddPolicy("reactApp", builder =>
//    {
//        builder
//        .AllowAnyMethod()
//        .AllowAnyHeader()
//         .SetIsOriginAllowed(origin => true)
//        //.WithOrigins("http://localhost:3000")
//        .AllowCredentials();
//    });
//});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options => options.DisplayRequestDuration());

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials()); // allow credentials

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//app.MapHub<DiscountHub>("/hub");
app.MapHub<DiscountHub>("/hub");

app.Run();
