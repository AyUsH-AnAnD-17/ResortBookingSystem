using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface IReviewService
    {
        Task<List<Review>> GetAllReviewsAsync();
        Task AddReviewAsync(Review review);
        Task<List<Review>> GetReviewsByUserIdAsync(long userId);
    }
}
