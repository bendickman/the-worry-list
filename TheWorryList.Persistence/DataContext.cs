using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Domain;
using TheWorryList.Domain.Identity;

namespace TheWorryList.Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions dbContextOptions) 
        : base(dbContextOptions)
        {
            
        }

        public DbSet<WorryItem> WorryItems { get; set; }
    }
}