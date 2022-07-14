using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using TheWorryList.Domain;
using TheWorryList.Persistence;

namespace TheWorryList.Application.Features.WorryItems
{
    public class Create
    {
        public class Command : IRequest
        {
            public WorryItem WorryItem { get; set; }
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
                _context.WorryItems.Add(request.WorryItem);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}