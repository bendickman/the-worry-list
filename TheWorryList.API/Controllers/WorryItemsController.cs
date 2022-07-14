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

        [HttpGet]
        public async Task<ActionResult<List<WorryItem>>> GetWorryItems()
        {
            return await _context
                .WorryItems
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorryItem>> GetWorryItem(Guid id)
        {
            return await _context
                .WorryItems
                .FindAsync(id);
        }
    }
}