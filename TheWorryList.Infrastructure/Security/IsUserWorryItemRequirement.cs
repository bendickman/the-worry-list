using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using TheWorryList.Persistence;
using Microsoft.EntityFrameworkCore;

namespace TheWorryList.Infrastructure.Security
{
    public class IsUserWorryItemRequirement : IAuthorizationRequirement
    {
    }

    public class IsUserWorryItemRequirementHandler : AuthorizationHandler<IsUserWorryItemRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        public IsUserWorryItemRequirementHandler(
        DataContext dbContext,
        IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }
        
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsUserWorryItemRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null) return Task.CompletedTask;

            var worryItemId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(rv => rv.Key == "id").Value?.ToString());

            var worryItem = _dbContext
                .WorryItems
                .Include(wi => wi.AppUser)
                .FirstOrDefault(wi => wi.Id == worryItemId);

                if (worryItem is null || !worryItem.AppUser.Id.Equals(userId))
                    return Task.CompletedTask;

            context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}