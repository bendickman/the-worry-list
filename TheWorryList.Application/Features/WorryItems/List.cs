using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Application.Core;
using TheWorryList.Domain;
using TheWorryList.Persistence;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace TheWorryList.Application.Features.WorryItems
{
    public class List
    {

        public class Query : IRequest<Result<IEnumerable<WorryItemDto>>>{}

        public class Handler : IRequestHandler<Query, Result<IEnumerable<WorryItemDto>>>
        {
            private readonly DataContext _dbContext;
            private readonly IMapper _mapper;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(
                DataContext dbContext,
                IMapper mapper,
                IHttpContextAccessor httpContextAccessor)
            {
                _dbContext = dbContext;
                _mapper = mapper;
                _httpContext = httpContextAccessor;
            }

            public async Task<Result<IEnumerable<WorryItemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var  currentUserName = _httpContext.HttpContext?.User.FindFirstValue(ClaimTypes.Name);

                var worryItemsDto = await _dbContext
                    .WorryItems
                    .ProjectTo<WorryItemDto>(_mapper.ConfigurationProvider)
                    .Where(wi => wi.User.UserName == currentUserName)
                    .ToListAsync();

                return Result<IEnumerable<WorryItemDto>>.Success(worryItemsDto);
            }
        }
    }
}