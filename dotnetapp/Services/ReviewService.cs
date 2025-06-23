using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public class ReviewService : IReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Review>> GetAllReviewsAsync()
        {
            return await _context.Reviews.Include(r=>r.User).ToListAsync();
        }

        public async Task AddReviewAsync(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Review>> GetReviewsByUserIdAsync(long userId)
        {
            return await _context.Reviews.Include(b=>b.User).Where(r => r.UserId == userId).ToListAsync();
        }
    }
}
