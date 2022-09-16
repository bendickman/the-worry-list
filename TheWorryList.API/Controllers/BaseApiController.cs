using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using TheWorryList.API.Extensions;
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

            return BadRequest();
        }

        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            if (result is null) 
                return NotFound();

            if (result.IsSuccess && result.Value != null)
            {
                Response.AddPaginationHeader(
                    result.Value.CurrentPage,
                    result.Value.PageSize,
                    result.Value.TotalCount,
                    result.Value.TotalPages);

                return Ok(result.Value);
            }

            if (result.IsSuccess && result.Value is null)
                return NotFound();

            return BadRequest();
        }

        protected ActionResult HandleIdentityResult<T>(Result<T> result)
        {
            if (result.IsSuccess && result.Value != null) 
                return Ok(result.Value);

            if (result.IsUnauthorised)
                return Unauthorized();

            AddModelStateErrors(result.Error, ModelState);
            return ValidationProblem(ModelState);
        }

        private void AddModelStateErrors(
            KeyValuePair<string, string> error,
            ModelStateDictionary modelState)
        {
            if (string.IsNullOrEmpty(error.Key) ||
                    string.IsNullOrEmpty(error.Value))
            {
                return;
            }

            modelState.AddModelError(error.Key, error.Value);
        }
    }
}