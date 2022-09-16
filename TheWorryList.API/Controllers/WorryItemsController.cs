using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheWorryList.Application.Core;
using TheWorryList.Application.Features.WorryItems;
using TheWorryList.Domain;

namespace TheWorryList.API.Controllers
{
    [Route("api/my-worry-items")]
    public class WorryItemsController : BaseApiController
    {
        [HttpDelete("{id}")]
        [Authorize(Policy = "IsUserWorryItem")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Features.WorryItems.Delete.Command{Id = id}));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsUserWorryItem")]
        public async Task<ActionResult> Update(Guid id, WorryItem worryItem)
        {
            worryItem.Id = id;
            return HandleResult(await Mediator.Send(new Application.Features.WorryItems.Update.Command{WorryItem = worryItem}));
        }

        [HttpPost]
        public async Task<ActionResult> Create(WorryItem worryItem)
        {
            return HandleResult(await Mediator.Send(new Application.Features.WorryItems.Create.Command{WorryItem = worryItem}));
        }

        [HttpPost("{id}/complete")]
        [Authorize(Policy = "IsUserWorryItem")]
        public async Task<ActionResult> Complete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Features.WorryItems.Complete.Request{WorryItemId = id}));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorryItem>>> GetWorryItems(
            [FromQuery]WorryItemParams worryItemParams
        )
        {
            return HandlePagedResult(await Mediator.Send(new Application.Features.WorryItems.List.Query{ WorryItemParams = worryItemParams}));
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "IsUserWorryItem")]
        public async Task<IActionResult> GetWorryItem(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Features.WorryItems.Details.Query{Id = id}));
        }
    }
}