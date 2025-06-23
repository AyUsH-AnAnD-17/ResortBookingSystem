using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{   
    
    [Route("api/")]
    [ApiController]
    public class ResortController : ControllerBase
    {
    private readonly IResortService _resortService;
    public ResortController(IResortService resortService)
    {
        _resortService = resortService;
    }


    [Authorize (Roles="Admin, Customer")]
    [HttpGet("resort")]
    public async Task<ActionResult<List<Resort>>> GetAllResorts()
    {
        try
        {
            var resorts = await _resortService.GetAllResortsAsync();
            return Ok(resorts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    // [Authorize (Roles="Admin")]
    [HttpPost("resort")]
    public async Task<ActionResult> AddResort([FromBody] Resort resort)
    {
        try
        {
            await _resortService.AddResortAsync(resort);
            return Created("Successfully added",resort);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    [HttpPut("resort/{resortId}")]
    // [Authorize (Roles="Admin")]
    public async Task<ActionResult> UpdateResort(long resortId, [FromBody] Resort resort)
    {
        try
        {
            await _resortService.UpdateResortAsync(resortId, resort);
            return Ok();
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    // [Authorize (Roles="Admin")]
    [HttpDelete("resort/{resortId}")]
    
    public async Task<ActionResult> DeleteResort(long resortId)
    {
        try
        {
            await _resortService.DeleteResortAsync(resortId);
            return Ok();
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    [HttpGet("resort/{id}")]
    public async Task<ActionResult<Resort>> GetResortById(long id)
    {
        try
        {
            var resort = await _resortService.GetResortByIdAsync(id);
            if (resort == null)
            {
                return NotFound();
            }
            return Ok(resort);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
}