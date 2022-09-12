using AutoMapper;
using FluentValidation;
using MediatR;
using TheWorryList.Application.Core;
using TheWorryList.Domain;
using TheWorryList.Persistence;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Application.Interfaces;

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
            private readonly IUserAccessor _userAccessor;

            public Handler(
                DataContext context,
                IMapper mapper,
                IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => 
                    u.UserName == _userAccessor.GetUserName());

                if (user is null) return null;

                var worryItem = await _context
                    .WorryItems
                    .Include(wi => wi.AppUser)
                    .FirstOrDefaultAsync(wi => wi.Id == request.WorryItem.Id);

                if (worryItem is null) return null;

                worryItem.ModifiedDate = DateTime.UtcNow;
                _mapper.Map(request.WorryItem, worryItem);
                worryItem.AppUser = user;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Worry Item", "Failed to update worry item");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}