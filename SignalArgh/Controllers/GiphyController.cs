using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SignalArgh.Models;

namespace SignalArgh.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiphyController : ControllerBase
    {
        private readonly Giphy giphy;

        public GiphyController(IOptions<Giphy> giphy)
        {
            this.giphy = giphy.Value;
        }

        [HttpGet("key")]
        public ActionResult<string> GetApiKey()
        {
            return this.Ok(this.giphy.Key);
        }
    }
}
