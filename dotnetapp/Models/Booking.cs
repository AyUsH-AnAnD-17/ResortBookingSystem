
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
 
namespace dotnetapp.Models
{
    public class Booking
{
    [Key]
    public long BookingId { get; set; }

    [Required]
    [Range(1, int.MaxValue)]
    public int NoOfPersons { get; set; }

    [Required]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    [Required]
    public string Status { get; set; } = string.Empty;  // default value

    [Required]
    public string Address { get; set; } = string.Empty;

    [Required]
    [Range(0, double.MaxValue)]
    public double TotalPrice { get; set; }

    public long? UserId { get; set; }
    public User? User { get; set; }

    public long? ResortId { get; set; }
    public Resort? Resort { get; set; }
}

}