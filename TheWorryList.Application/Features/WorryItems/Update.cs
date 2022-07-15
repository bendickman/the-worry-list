using AutoMapper;
using MediatR;
using TheWorryList.Domain;
using TheWorryList.Persistence;

namespace TheWorryList.Application.Features.WorryItems
{
    public class Update
    {
        public class Command : IRequest 
        {
            public WorryItem WorryItem { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(
                DataContext context,
                IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var worryItem = await _context.WorryItems.FindAsync(request.WorryItem.Id);

                if (worryItem is null)
                {
                    return Unit.Value;
                }

                _mapper.Map(request.WorryItem, worryItem);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}