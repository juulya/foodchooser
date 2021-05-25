using FoodChooser.DbContext;
using FoodChooser.Model;
using FoodChooser.Model.Helper;
using FoodChooser.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodChooser.Repository
{
    public class RecipeRepository : IRecipeRepository
    {
        private FoodChooserDbContext _db;
        public RecipeRepository(FoodChooserDbContext db)
        {
            _db = db;
        }

        public void Delete(int id)
        {
            var entityToDelete = _db.Recipies.FirstOrDefault(x => x.id == id);
            _db.Recipies.Remove(entityToDelete);
        }

        public IEnumerable<Recipe> Filter(FilterModel filter)
        {
            var result = _db.Recipies
                            .Where(x => string.IsNullOrEmpty(filter.type) ? true : x.type == filter.type)
                            .Where(x => string.IsNullOrEmpty(filter.temperature) ? true : x.temperature == filter.temperature)
                            .Where(x => string.IsNullOrEmpty(filter.supply) ? true : x.supply == filter.supply)
                            .Where(x => string.IsNullOrEmpty(filter.name) ? true : x.name.ToLower().Contains(filter.name.ToLower()))
                            .ToList();
            return result;
        }

        public IEnumerable<Recipe> GetAll()
        {
            return _db.Recipies.ToList();
        }

        public void Save(Recipe recipe)
        {
            _db.Recipies.Add(recipe);
            _db.SaveChanges();
        }

        public void Update(Recipe recipe)
        {
            var entityToUpdate = _db.Recipies.FirstOrDefault(x => x.id == recipe.id);

            entityToUpdate.imgSrc = recipe.imgSrc;
            entityToUpdate.name = recipe.name;
            entityToUpdate.supply = recipe.supply;
            entityToUpdate.temperature = recipe.temperature;
            entityToUpdate.type = recipe.type;

            _db.SaveChanges();
        }
    }
}
