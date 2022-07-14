using MediatR;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Application.Core;
using TheWorryList.Domain;
using TheWorryList.Persistence;

namespace TheWorryList.Application.Features.WorryItems
{
    public class List
    {

        public class Query : IRequest<Result<IEnumerable<WorryItem>>>{}

        public class Handler : IRequestHandler<Query, Result<IEnumerable<WorryItem>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<IEnumerable<WorryItem>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var worryItems = await _context
                    .WorryItems
                    .ToListAsync();

                return Result<IEnumerable<WorryItem>>.Success(worryItems);
            }
        }
    }
}