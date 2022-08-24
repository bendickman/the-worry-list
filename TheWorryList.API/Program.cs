using Microsoft.EntityFrameworkCore;
using TheWorryList.Persistence;
using TheWorryList.API.Extensions;
using FluentValidation.AspNetCore;
using TheWorryList.Application.Features.WorryItems;
using TheWorryList.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(config => 
                {
                    config.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;  
                })
                .AddFluentValidation(config => 
                {
                    config.RegisterValidatorsFromAssemblyContaining<Create>();
                });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

//move this to own clas
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
