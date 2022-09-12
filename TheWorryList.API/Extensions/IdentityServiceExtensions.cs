using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TheWorryList.Application.Core.Constants;
using TheWorryList.Domain.Identity;
using TheWorryList.Infrastructure.Security;
using TheWorryList.Persistence;

namespace TheWorryList.API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt => 
            {
                
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config[AppSettings.TokenKey]));
            services.AddAuthentication(opt => 
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opt => 
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
            });

            services.AddAuthorization(opt => 
            {
                opt.AddPolicy("IsUserWorryItem", policy =>
                {
                    policy.Requirements.Add(new IsUserWorryItemRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsUserWorryItemRequirementHandler>();

            return services;
        }
    }
}