using MediatR;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Application.Core;
using TheWorryList.Application.Interfaces;
using TheWorryList.Persistence;

namespace TheWorryList.Application.Features.WorryItems
{
    public class Complete
    {
        public class Request : IRequest<Result<Unit>>
        {
            public Guid WorryItemId { get; set; }
        }

        public class Handler : IRequestHandler<Request, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(
            DataContext context,
            IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Request request, CancellationToken cancellationToken)
            {
                var worryItem = await _context
                    .WorryItems
                    .Include(s => s.Actions)
                    .FirstOrDefaultAsync(wi => wi.Id == request.WorryItemId);

                if (worryItem is null) return null;

                worryItem.IsComplete = !worryItem.IsComplete;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Worry Item", "Failed to update worry item completion");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}