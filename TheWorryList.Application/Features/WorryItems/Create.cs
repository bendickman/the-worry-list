using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using TheWorryList.Application.Core;
using TheWorryList.Domain;
using TheWorryList.Persistence;

namespace TheWorryList.Application.Features.WorryItems
{
    public class Create
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

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.WorryItems.Add(request.WorryItem);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create worry item");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}