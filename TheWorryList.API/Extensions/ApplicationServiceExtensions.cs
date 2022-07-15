using MediatR;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Application.Features.WorryItems;
using TheWorryList.Persistence;

namespace TheWorryList.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            //move thse to their own class
            services.AddDbContext<DataContext>(opt => 
            {
                var connectionString = config.GetConnectionString("DefaultConnection");
                opt.UseSqlite(connectionString);
            });

            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly);

            return services;
        }
    }
}