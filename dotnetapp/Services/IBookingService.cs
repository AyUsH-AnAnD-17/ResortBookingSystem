using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
namespace dotnetapp.Services
{
    public interface IBookingService
    {
        Task<Booking> GetBookingByIdAsync(long id);
        Task<List<Booking>> GetBookingsByUserIdAsync(long userId);
        Task<List<Booking>> GetAllBookingsAsync();
        Task AddBookingAsync(Booking booking);
        Task DeleteBookingAsync(long id);
        Task UpdateBookingStatusAsync(long id, string newStatus);

        Task<int> GetTotalPersonsBookedForResortAsync(long resortId);
    }
}