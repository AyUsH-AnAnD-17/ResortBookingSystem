
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
 
namespace dotnetapp.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }
 
       // [Required]
        public long UserId { get; set; }
 
        [Required]
        public string Subject { get; set; }
 
        [Required]
        public string Body { get; set; }
 
        public int Rating { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateCreated { get; set; }
        public User? User { get; set; }
    }
}