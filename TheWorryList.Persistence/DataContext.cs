using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TheWorryList.Domain;

namespace TheWorryList.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions dbContextOptions) 
        : base(dbContextOptions)
        {
            
        }

        public DbSet<WorryItem> WorryItems { get; set; }
    }
}