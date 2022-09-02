using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheWorryList.Domain;

namespace TheWorryList.API.Controllers
{
    public class WorryItemsController : BaseApiController
    {
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Features.WorryItems.Delete.Command{Id = id}));
        }

        [HttpPut("{id}")]
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorryItem>>> GetWorryItems()
        {
            return HandleResult(await Mediator.Send(new Application.Features.WorryItems.List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorryItem(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Features.WorryItems.Details.Query{Id = id}));
        }
    }
}