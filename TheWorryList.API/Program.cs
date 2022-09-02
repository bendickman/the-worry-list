using Microsoft.EntityFrameworkCore;
using TheWorryList.Persistence;
using TheWorryList.API.Extensions;
using FluentValidation.AspNetCore;
using TheWorryList.Application.Features.WorryItems;
using TheWorryList.API.Middleware;
using Microsoft.AspNetCore.Identity;
using TheWorryList.Domain.Identity;
using Microsoft.OpenApi.Models;
using Microsoft.Net.Http.Headers;
using TheWorryList.API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(config => 
                {
                    config.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true; 
                    var policy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build();
                    config.Filters.Add(new AuthorizeFilter(policy));
                })
                .AddFluentValidation(config => 
                {
                    config.RegisterValidatorsFromAssemblyContaining<Create>();
                });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "The Worry List", Version = "v1" });
        c.AddSecurityDefinition("token", new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.ApiKey,
            In = ParameterLocation.Header,
            Name = HeaderNames.Authorization,
            Scheme = "Bearer"
        });
        c.OperationFilter<SecureEndpointAuthRequirementFilter>();
    });
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//move this to own class
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
