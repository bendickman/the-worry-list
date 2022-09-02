using System.Security.Claims;
using System.Text;
using MediatR;
using TheWorryList.Domain.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using TheWorryList.Application.Core.Constants;
using Microsoft.Extensions.Configuration;

namespace TheWorryList.Application.Features.Account
{
    public class Token
    {
        public class Query : IRequest<string>
        {
            public AppUser AppUser { get; set; }
        }

        public class Handler : IRequestHandler<Query, string>
        {
            private IConfiguration _config;
            public Handler(IConfiguration config)
            {
                _config = config;
            }

            public Task<string> Handle(Query request, CancellationToken cancellationToken)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, request.AppUser.UserName),
                    new Claim(ClaimTypes.NameIdentifier, request.AppUser.Id),
                    new Claim(ClaimTypes.Email, request.AppUser.Email),
                };
                var test = _config[AppSettings.TokenKey];
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config[AppSettings.TokenKey]));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(7),
                    SigningCredentials = credentials,
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);

                return Task.FromResult(tokenHandler.WriteToken(token));
            }
        }
    }
}