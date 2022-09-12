using MediatR;
using TheWorryList.Application.Core;
using TheWorryList.Domain;
using TheWorryList.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace TheWorryList.Application.Features.WorryItems
{
    public class Details
    {
        public class Query : IRequest<Result<WorryItemDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<WorryItemDto>>
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

            public async Task<Result<WorryItemDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var worryItemDto = await _context
                .WorryItems
                .ProjectTo<WorryItemDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(wi => wi.Id == request.Id);

                return Result<WorryItemDto>.Success(worryItemDto);
            }
        }

    }
}