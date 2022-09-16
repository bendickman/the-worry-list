using Newtonsoft.Json;

namespace TheWorryList.API.Extensions
{
    public static class HttpExtensions
    {
        private const string _paginationHeaderName = "Pagination";

        public static void AddPaginationHeader(
            this HttpResponse response,
            int currentPage,
            int itemsPerPage,
            int totalItems,
            int totalPages)
        {
            var paginationHeader = new {
                currentPage,
                itemsPerPage,
                totalItems, 
                totalPages,
            };

            response.Headers.Add(_paginationHeaderName, JsonConvert.SerializeObject(paginationHeader));
            response.Headers.Add("Access-Control-Expose-Headers", _paginationHeaderName);
        }        
    }
}