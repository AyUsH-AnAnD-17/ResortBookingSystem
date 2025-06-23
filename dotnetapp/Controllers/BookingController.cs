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
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }
        
        
    [HttpGet("booking")]
    // [Authorize(Roles="Admin, Customer")]
    public async Task<ActionResult<List<Booking>>> GetAllBookings()
    {
        var bookings = await _bookingService.GetAllBookingsAsync();
        return Ok(bookings);
    }


    [HttpPost("booking")]
    // [Authorize(Roles="Customer")]
    public async Task<ActionResult> AddBooking(Booking booking)
    {
        await _bookingService.AddBookingAsync(booking);
        return Ok(booking);
    }   
    
    
    [HttpDelete("booking/{bookingId}")]
    // [Authorize(Roles="Customer")]
    public async Task<ActionResult> DeleteBooking(long bookingId)
    {
        await _bookingService.DeleteBookingAsync(bookingId);
        return Ok();
    }


    [HttpPut("booking/{id}/{newStatus}")]
    // [Authorize(Roles="Admin, Customer")]
    public async Task<ActionResult> UpdateBookingStatus(long id, string newStatus)
    {
        await _bookingService.UpdateBookingStatusAsync(id, newStatus);
        return Ok();
    }   
    
    
    [HttpGet("user/{userId}")]
    // [Authorize(Roles="Customer")]
    public async Task<ActionResult<List<Booking>>> GetBookingsByUserId(long userId)
    {
        var bookings = await _bookingService.GetBookingsByUserIdAsync(userId);
        return Ok(bookings);
    }   
    
    
    [HttpGet("booking/{id}")]
    // [Authorize(Roles="Admin, Customer")]
    public async Task<ActionResult<Booking>> GetBookingById(long id)
    {
        var booking = await _bookingService.GetBookingByIdAsync(id);
        if (booking == null)
        {
            return NotFound();
        }
        return Ok(booking);
    }   
    
    
    [HttpGet("booking/totalpersons/{resortId}")]
    public async Task<ActionResult<int>> GetTotalPersonsBookedForResort(long resortId)
    {
        int totalPersonsBooked = await _bookingService.GetTotalPersonsBookedForResortAsync(resortId);
        return Ok(totalPersonsBooked);
    }



    }
}