using FoodChooser.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodChooser.DbContext
{
    public class FoodChooserDbContext : System.Data.Entity.DbContext
    {
        public FoodChooserDbContext() : base("FoodChooserDb") 
        {
            Database.SetInitializer<FoodChooserDbContext>(new CreateDatabaseIfNotExists<FoodChooserDbContext>());
        }

        public DbSet<Recipe> Recipies { get; set; }

    }
}
