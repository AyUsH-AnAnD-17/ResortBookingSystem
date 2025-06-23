using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
namespace dotnetapp.Services
{
    public interface IResortService
    {
        Task<List<Resort>> GetAllResortsAsync();
        Task AddResortAsync(Resort resort);
        Task UpdateResortAsync(long id, Resort resort);
        Task DeleteResortAsync(long id);
        Task<Resort> GetResortByIdAsync(long id);
    }
}