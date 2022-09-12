using AutoMapper;
using TheWorryList.Application.Features.WorryItems;
using TheWorryList.Domain;
using TheWorryList.Domain.Identity;

namespace TheWorryList.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<WorryItem, WorryItem>();
            CreateMap<AppUser, AppUser>();
            CreateMap<AppUser, Features.Profiles.Profile>();

            CreateMap<WorryItem, WorryItemDto>()
                .ForMember(d => d.User, o => o.MapFrom(s => s.AppUser));        
        }
    }
}