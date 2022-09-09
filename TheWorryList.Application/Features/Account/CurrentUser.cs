using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using TheWorryList.Application.Core;
using TheWorryList.Domain.Identity;
using TheWorryList.Domain.Identity.Dtos;

namespace TheWorryList.Application.Features.Account
{
    public class CurrentUser
    {
        public class Query: IRequest<Result<UserDto>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<UserDto>>
        {
            private readonly UserManager<AppUser> _userManager;

            private readonly IHttpContextAccessor _httpContextAccessor;

            private readonly IMediator _mediator;

            public Handler(
                UserManager<AppUser> userManager,
                IHttpContextAccessor httpContextAccessor,
                IMediator mediator)
            {
                _userManager = userManager;
                _httpContextAccessor = httpContextAccessor;
                _mediator = mediator;
            }

            public async Task<Result<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var id = _httpContextAccessor?.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                var user = await _userManager.FindByIdAsync(id);
                var token = await _mediator.Send(new Token.Query{AppUser = user});

                var userDto = new UserDto
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = token,
                    ProfileImage = "",
                };

                return Result<UserDto>.Success(userDto);
            }
        }
    }
}