using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Application.Core;
using TheWorryList.Application.Interfaces;
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
        private readonly IUserAccessor _userAccessor;

            public Handler(
                DataContext context,
                IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => 
                    u.UserName == _userAccessor.GetUserName());

                request.WorryItem.AppUser = user;
                _context.WorryItems.Add(request.WorryItem);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Worry Item", "Failed to create worry item");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}