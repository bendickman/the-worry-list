using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TheWorryList.Application.Core;
using TheWorryList.Domain.Identity;
using TheWorryList.Domain.Identity.Dtos;

namespace TheWorryList.Application.Features.Account
{
    public class Login
    {
        public class Query : IRequest<Result<UserDto>>
        {
            public string Email { get; set; }

            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Query>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, Result<UserDto>>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IMediator _mediator;

            public Handler(
                UserManager<AppUser> userManager,
                SignInManager<AppUser> signInManager,
                IMediator mediator)
            {
                _userManager = userManager;
                _signInManager = signInManager;
                _mediator = mediator;
            }

            public async Task<Result<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user is null) return Result<UserDto>.Failure("Unauthorised");

                var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (signInResult.Succeeded)
                {
                    var token = await _mediator.Send(new Token.Query{AppUser = user});

                    var userDto = new UserDto
                    {
                        DisplayName = user.DisplayName,
                        Username = user.UserName,
                        Token = token,
                        ProfileImage = "to be implemented",
                    };

                    return Result<UserDto>.Success(userDto);
                }

                return Result<UserDto>.Failure("Unauthorised");
            }
        }
    }
}