using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Application.Core;
using TheWorryList.Application.Validators;
using TheWorryList.Domain.Identity;
using TheWorryList.Domain.Identity.Dtos;

namespace TheWorryList.Application.Features.Account
{
    public class Register
    {
        public class Command : IRequest<Result<UserDto>>
        {
            public string DisplayName { get; set; }

            public string UserName { get; set; }

            public string Email { get; set; }

            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command, Result<UserDto>>
        {
            private UserManager<AppUser> _userManager;
            private IMediator _mediator;

            public Handler(
                UserManager<AppUser> userManager,
                IMediator mediator)
            {
                _userManager = userManager;
                _mediator = mediator;
            }

            public async Task<Result<UserDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _userManager.Users.AnyAsync(u => u.Email == request.Email))
                {
                    return Result<UserDto>.Failure("email", "This email is taken");
                }
                if (await _userManager.Users.AnyAsync(u => u.UserName == request.UserName))
                {
                    return Result<UserDto>.Failure("username", "This username is taken");
                }

                var user = new AppUser
                {
                    Email = request.Email,
                    DisplayName = request.DisplayName,
                    UserName = request.UserName,
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded)
                {
                    return Result<UserDto>.Failure("account", "Error registering user");
                }

                var token = await _mediator.Send(new Token.Query { AppUser = user });

                var userDto = new UserDto
                {
                    DisplayName = user.DisplayName,
                    ProfileImage = null,
                    UserName = user.UserName,
                    Token = token,
                };

                return Result<UserDto>.Success(userDto);
            }
        }
    }
}