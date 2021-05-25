using System.ComponentModel.DataAnnotations;

namespace FoodChooser.Model
{
    public class Recipe
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string type { get; set; }
        [Required]
        public string temperature { get; set; }
        [Required]
        public string imgSrc { get; set; }
        [Required]
        public string supply { get; set; }
    }
}
