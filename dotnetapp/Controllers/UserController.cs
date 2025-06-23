using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using System.Security.Claims;
[Route("api/")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        try
        {
            await _userService.RegisterUserAsync(user);
            return Ok("User registered successfully");
        }
        catch (Exception ex)
        {
            return BadRequest($"Registration failed. {ex.Message}");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginModel loginModel)
    {
        try
        {
            var user = await _userService.AuthenticateAsync(loginModel.Email, loginModel.Password);

            if (user == null)
                return BadRequest("Invalid credentials");

            var token = await _userService.GenerateJwtTokenAsync(user);
            var response = new UserLoginResponse
            {
                UserId = user.UserId.ToString(),
                UserName = user.Username,
                UserRole = user.UserRole,
                Token = token
            };
            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest($"Login failed. {ex.Message}");
        }
    }

    
    [HttpGet("user/info")]
    public async Task<IActionResult> GetUserInfo()
    {
        try
        {
            // Retrieve user information from the current user's claims
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = User.FindFirstValue(ClaimTypes.Name);
            var email = User.FindFirstValue(ClaimTypes.Email);

            var userInfo = new
            {
                UserId = userId,
                Username = username,
                Email = email
            };

            return Ok(userInfo);
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to retrieve user information. {ex.Message}");
        }
    }
}
