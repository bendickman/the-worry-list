using TheWorryList.Application.Core;

namespace TheWorryList.Application.Features.WorryItems
{
    public class WorryItemParams : PagingParams
    {
        public bool? IsComplete { get; set; }

        public DateTime StartDate { get; set; } = DateTime.MinValue;
    }
}