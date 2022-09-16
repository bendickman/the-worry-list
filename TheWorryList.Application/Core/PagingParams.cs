namespace TheWorryList.Application.Core
{
    public class PagingParams
    {
        private const int _maxPages = 25;

        private int _pageSize = 10;

        public int PageNumber { get; set; } = 1;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > _maxPages) ? _maxPages : value;
        }
    }
}