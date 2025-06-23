using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
namespace dotnetapp.Services
{
    public class ResortService:IResortService
    {
        private readonly ApplicationDbContext _context;

        public ResortService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Resort>> GetAllResortsAsync()
        {
            return await _context.Resorts.ToListAsync();
        }

        public async Task AddResortAsync(Resort resort)
        {
            _context.Resorts.Add(resort);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateResortAsync(long id, Resort resort)
        {
            var existingResort = await _context.Resorts.FindAsync(id);
            if (existingResort == null)
            {
                throw new ArgumentException("Resort not found");
            }

            existingResort.ResortName = resort.ResortName; // Update properties as needed
            existingResort.ResortImageUrl = resort.ResortImageUrl;
             // Update properties as needed
            existingResort.ResortLocation = resort.ResortLocation;
            existingResort.ResortAvailableStatus = resort.ResortAvailableStatus; // Update properties as needed
            existingResort.Price = resort.Price;
            existingResort.Capacity = resort.Capacity;
            existingResort.Description = resort.Description; // Update properties as needed
            

            await _context.SaveChangesAsync();
        }

        public async Task DeleteResortAsync(long id)
        {
            var resort = await _context.Resorts.FindAsync(id);
            if (resort == null)
            {
                throw new ArgumentException("Resort not found");
            }

            _context.Resorts.Remove(resort);
            await _context.SaveChangesAsync();
        }

        public async Task<Resort> GetResortByIdAsync(long id)
        {
            return await _context.Resorts.FindAsync(id);
        }
    }
}