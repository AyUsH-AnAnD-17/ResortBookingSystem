
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
 
namespace dotnetapp.Models
{
    public class Resort
    {
        [Key]
        public long ResortId { get; set; }
 
        [Required]
        public string ResortName { get; set; }
 
        [Required]
        public string ResortImageUrl { get; set; }
 
        [Required]
        public string ResortLocation { get; set; }
 
        [Required]
        public string ResortAvailableStatus { get; set; }

        [Required]
        [Range(0, long.MaxValue)]
        public long Price { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Capacity { get; set; }
        
        [Required]
        public string Description { get; set; }
 
        public ICollection<Booking>? Bookings { get; set; }
    }
}