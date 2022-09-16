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

        public class Query : IRequest<Result<PagedList<WorryItemDto>>>
        {
            public WorryItemParams WorryItemParams { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<WorryItemDto>>>
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

            public async Task<Result<PagedList<WorryItemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var  currentUserName = _httpContext.HttpContext?.User.FindFirstValue(ClaimTypes.Name);

                var query = _dbContext
                    .WorryItems
                    .Where(wi => wi.CreatedDate > request.WorryItemParams.StartDate)
                    .OrderByDescending(wi => wi.ModifiedDate)
                    .ProjectTo<WorryItemDto>(_mapper.ConfigurationProvider)
                    .Where(wi => wi.User.UserName == currentUserName)
                    .AsQueryable();

                if (request.WorryItemParams.IsComplete.HasValue)
                {
                    query = query
                        .Where(wi => wi.IsComplete == request.WorryItemParams.IsComplete);
                }

                return Result<PagedList<WorryItemDto>>.Success(
                    await PagedList<WorryItemDto>.CreateAsync(
                        query, 
                        request.WorryItemParams.PageSize, 
                        request.WorryItemParams.PageNumber)
                );
            }
        }
    }
}