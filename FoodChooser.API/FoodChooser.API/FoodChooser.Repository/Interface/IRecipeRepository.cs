using FoodChooser.Model;
using FoodChooser.Model.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodChooser.Repository.Interface
{
    public interface IRecipeRepository
    {
        IEnumerable<Recipe> GetAll();
        IEnumerable<Recipe> Filter(FilterModel filter);
        void Save(Recipe recipe);
        void Update(Recipe recipe);
        void Delete(int id);
    }
}
