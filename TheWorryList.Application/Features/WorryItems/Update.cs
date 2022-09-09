using AutoMapper;
using FluentValidation;
using MediatR;
using TheWorryList.Application.Core;
using TheWorryList.Domain;
using TheWorryList.Persistence;

namespace TheWorryList.Application.Features.WorryItems
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public WorryItem WorryItem { get; set; }
        }

        public class CreateValidator : AbstractValidator<Command>
        {
            public CreateValidator()
            {
                RuleFor(wi => wi.WorryItem).SetValidator(new WorryItemValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
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
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var worryItem = await _context.WorryItems.FindAsync(request.WorryItem.Id);

                if (worryItem is null) return null;

                worryItem.ModifiedDate = DateTime.UtcNow;
                _mapper.Map(request.WorryItem, worryItem);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Worry Item", "Failed to update worry item");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}