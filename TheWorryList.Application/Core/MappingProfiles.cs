using AutoMapper;
using TheWorryList.Domain;

namespace TheWorryList.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<WorryItem, WorryItem>();
        }
    }
}