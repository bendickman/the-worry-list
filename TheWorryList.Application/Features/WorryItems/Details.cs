using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using TheWorryList.Application.Core;
using TheWorryList.Domain;
using TheWorryList.Persistence;

namespace TheWorryList.Application.Features.WorryItems
{
    public class Details
    {
        public class Query : IRequest<Result<WorryItem>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<WorryItem>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<WorryItem>> Handle(Query request, CancellationToken cancellationToken)
            {
                var worryItem = await _context
                .WorryItems
                .FindAsync(request.Id);

                return Result<WorryItem>.Success(worryItem);
            }
        }

    }
}