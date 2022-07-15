using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Domain;
using TheWorryList.Persistence;

namespace TheWorryList.API.Controllers
{
    public class WorryItemsController : BaseApiController
    {
        private readonly DataContext _context;
        
        public WorryItemsController(DataContext context)
        {
            _context = context;   
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Application.Features.WorryItems.Delete.Command{Id = id});

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(Guid id, WorryItem worryItem)
        {
            worryItem.Id = id;
            var result = await Mediator.Send(new Application.Features.WorryItems.Update.Command{WorryItem = worryItem});

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Create(WorryItem worryItem)
        {
            var result = await Mediator.Send(new Application.Features.WorryItems.Create.Command{WorryItem = worryItem});

            return Created("", null);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorryItem>>> GetWorryItems()
        {
            var result = await Mediator.Send(new Application.Features.WorryItems.List.Query());
            
            if (!result.IsSuccess)
            {
                return BadRequest();
            }

            return Ok(result.Value);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorryItem>> GetWorryItem(Guid id)
        {
            var result = await Mediator.Send(new Application.Features.WorryItems.Details.Query{Id = id});

            if (!result.IsSuccess)
            {
                return NotFound();
            }

            return Ok(result.Value);
        }
    }
}