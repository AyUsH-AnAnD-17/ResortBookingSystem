using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Models;
namespace dotnetapp.Services
{
    public class BookingService:IBookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Booking> GetBookingByIdAsync(long id)
        {
            return await _context.Bookings.FindAsync(id);
        }

        public async Task<List<Booking>> GetBookingsByUserIdAsync(long userId)
        {
            return await _context.Bookings.Include(b=>b.User).Include(b=>b.Resort).Where(b => b.UserId == userId).ToListAsync();
        }

        public async Task<List<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings.Include(b=>b.Resort).Include(u=>u.User).Include(u=>u.Resort).ToListAsync();
        }

        public async Task AddBookingAsync(Booking booking)
        {
            bool hasConflictingBookings = await _context.Bookings.AnyAsync(b =>
                b.UserId == booking.UserId &&
                b.ResortId == booking.ResortId &&
                b.FromDate.Date <= booking.ToDate.Date && // Use Date property to ignore time part
                b.ToDate.Date >= booking.FromDate.Date    // Use Date property to ignore time part
            );

            if (hasConflictingBookings)
            {
                throw new InvalidOperationException("Cannot book on conflicting dates for the same resort.");
            }

            // If no conflicts, add the booking
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();


            
        }

        public async Task DeleteBookingAsync(long id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateBookingStatusAsync(long id, string newStatus)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                booking.Status = newStatus;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> GetTotalPersonsBookedForResortAsync(long resortId)
        {
            int totalPersonsBooked = await _context.Bookings
                .Where(b => b.ResortId == resortId && b.Status=="Accepted")
                .SumAsync(b => b.NoOfPersons);
            return totalPersonsBooked;
        }

    }
}