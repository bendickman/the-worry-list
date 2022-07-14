using Microsoft.AspNetCore.Mvc;

namespace TheWorryList.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        public BaseApiController() {}
    }
}