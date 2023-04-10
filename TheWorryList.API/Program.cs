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

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

//prevent mime sniffing of content type
app.UseXContentTypeOptions();
//prevent the browser sharing details of the app when navigating away
app.UseReferrerPolicy(opt => opt.NoReferrer());
app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
//prevent site being loaded in xFrame to stop click jacking
app.UseXfo(opt => opt.Deny());
//whitelist 3rd party sources used within our app. 
//Self ensures all content loaded from our app is included in the whitelist
app.UseCsp(opt => opt
    .BlockAllMixedContent() //only load https content
    .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com").CustomSources("https://cdn.jsdelivr.net"))
    .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
    .FormActions(s => s.Self())
    .FrameAncestors(s => s.Self())
    .ImageSources(s => s.Self())
    .ScriptSources(s => s.Self())
);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else 
{
    app.Use(async (context, next) => 
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

app.UseRouting();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(config => 
{
    config.MapControllers();
    config.MapFallbackToController("Index", "Fallback");
});

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