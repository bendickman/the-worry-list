using MediatR;
using Microsoft.AspNetCore.Mvc;
using TheWorryList.Application.Core;

namespace TheWorryList.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        public BaseApiController() {}

        private IMediator _mediator;
        
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result is null) 
                return NotFound();

            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);

            if (result.IsSuccess && result.Value is null)
                return NotFound();

            return BadRequest(result.Error);
        }

        protected ActionResult HandleIdentityResult<T>(Result<T> result)
        {
            if (result.IsSuccess && result.Value != null) 
                return Ok(result.Value);

            return Unauthorized();
        }
    }
}