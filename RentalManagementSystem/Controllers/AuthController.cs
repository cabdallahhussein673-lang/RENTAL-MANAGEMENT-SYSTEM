using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentalManagementSystem.Data;
using RentalManagementSystem.Model;

namespace RentalManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        UserData data = new UserData();

        [HttpPost("login")]
        public IActionResult Login(User login)
        {
            User user = data.Login(login.UserName, login.Password);

            if (user == null)
            {
                return BadRequest("Invalid Username or Password");
            }

            return Ok(user);
        }
    }
}


