using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
   
    [Route("api/")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }
        [Authorize (Roles="Admin, Customer")]
        [HttpGet("review")]
        public async Task<ActionResult<List<Review>>> GetAllReviews()
        {
            var reviews = await _reviewService.GetAllReviewsAsync();
            return Ok(reviews);
        }
        // [Authorize (Roles="Customer")]
        [HttpPost("Review")]
        public async Task<ActionResult> AddReview(Review review)
        {
            await _reviewService.AddReviewAsync(review);
            return Ok();
        }           
        // [Authorize(Roles="Customer")]
        [HttpGet("review/{userId}")]
        public async Task<ActionResult<List<Review>>> GetReviewsByUserId(long userId)
        {
            var reviews = await _reviewService.GetReviewsByUserIdAsync(userId);
            return Ok(reviews);
        }
    }
}