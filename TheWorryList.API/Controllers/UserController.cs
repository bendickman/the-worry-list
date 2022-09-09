using Microsoft.AspNetCore.Mvc;
using TheWorryList.Domain.Identity.Dtos;
using TheWorryList.Application.Features.Account;
using Microsoft.AspNetCore.Authorization;

namespace TheWorryList.API.Controllers
{
    [Route("api/user")]
    public class UserController : BaseApiController
    {

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(Login.Query query)
        {
            return HandleIdentityResult<UserDto>(await Mediator.Send(query));
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(Register.Command command)
        {
            return HandleIdentityResult<UserDto>(await Mediator.Send(command));
        }

        [HttpGet]
        public async Task<IActionResult> CurrentUser()
        {
            return HandleIdentityResult<UserDto>(await Mediator.Send(new CurrentUser.Query()));
        }
    }
}