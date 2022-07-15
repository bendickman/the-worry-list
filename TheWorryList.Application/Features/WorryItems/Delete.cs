using MediatR;
using TheWorryList.Persistence;

namespace TheWorryList.Application.Features.WorryItems
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var worryItem = await _context.WorryItems.FindAsync(request.Id);

                if (worryItem is null)
                {
                    return Unit.Value;
                }

                _context.Remove(worryItem);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}