 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Threading.Tasks;
 using Microsoft.EntityFrameworkCore;
 using Microsoft.AspNetCore.Mvc;
 using dotnetapp.Models;
 namespace dotnetapp.Services
 {
     public interface IUserService
     {
         Task RegisterUserAsync(User user);
         Task<string> GenerateJwtTokenAsync(User user);
         Task<User> GetUserByEmailAsync(string email);
         Task<List<User>> GetAllUsersAsync();
         Task<User> GetUserByIdAsync(long userId);
         Task<User> AuthenticateAsync(string email, string password);
     }
 }