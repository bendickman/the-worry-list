using MediatR;
using TheWorryList.Application.Core;
using TheWorryList.Persistence;

namespace TheWorryList.Application.Features.WorryItems
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var worryItem = await _context.WorryItems.FindAsync(request.Id);

                //if (worryItem is null) return null;

                _context.Remove(worryItem);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete worry item");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}