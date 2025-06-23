
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
 
namespace dotnetapp.Models
{
    public class User
    {
        [Key]
        public long UserId { get; set; }
 
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
 
        [Required]
        public string Password { get; set; }
        public string? Username { get; set; }
 
        [Phone]
        public string? MobileNumber { get; set; }
 
        public string? UserRole { get; set; }
 
       
    }
}