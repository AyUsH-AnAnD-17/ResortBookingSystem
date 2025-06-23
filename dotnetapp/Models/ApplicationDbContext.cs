using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Resort> Resorts { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}