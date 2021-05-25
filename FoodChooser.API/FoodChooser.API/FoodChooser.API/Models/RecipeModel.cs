using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoodChooser.API.Models
{
    public class RecipeModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string temperature { get; set; }
        public string imgSrc { get; set; }
        public string supply { get; set; }
    }
}