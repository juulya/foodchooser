using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.IO;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using FoodChooser.API.Models;
using FoodChooser.Model.Helper;
using FoodChooser.Model;
using FoodChooser.Repository.Interface;

namespace FoodChooser.API.Controllers
{
    [RoutePrefix("recipe")]
    public class RecipeController : ApiController
    {
        private static readonly string dbPath = AppDomain.CurrentDomain.BaseDirectory + "\\Content\\food-db.json";

        private List<Recipe> _recipeList = 
            JsonConvert.DeserializeObject<List<Recipe>>
            (
                File.ReadAllText(dbPath)
            );

        private IRecipeRepository _recipeRepository;
        public RecipeController(IRecipeRepository repo)
        {
            _recipeRepository = repo;
        }

        [HttpGet]
        [Route("GetAll")]
        public HttpResponseMessage GetRecipies()
        {
            var result = _recipeRepository.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        [Route("filter")]
        public HttpResponseMessage FilterRecipies(FilterModel filter)
        {
            var result = _recipeRepository.Filter(filter);

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage SaveRecipe(Recipe model)
        {
            if(ValidateRecipe(model))
            {
                _recipeRepository.Save(model);

                return Request.CreateResponse(HttpStatusCode.Created);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Validation failed");
            }
        }

        [HttpPut]
        [Route("update")]
        public HttpResponseMessage UpdateRecipe(Recipe model)
        {
            if (ValidateRecipe(model))
            {
                _recipeRepository.Update(model);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Validation failed");
            }
        }

        [HttpDelete]
        [Route("delete")]
        public HttpResponseMessage DeleteRecipe(int id)
        {
            _recipeRepository.Delete(id);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("convertjsontosql")]
        public HttpResponseMessage ConvertJsonToSql()
        {
            var recipeListOrdered = _recipeList.OrderBy(x => x.id).ToList();
            foreach(var item in recipeListOrdered)
            {
                _recipeRepository.Save(item);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        private bool ValidateRecipe(Recipe model)
        {
            return !string.IsNullOrEmpty(model.name) &&
                   !string.IsNullOrEmpty(model.imgSrc) &&
                   !string.IsNullOrEmpty(model.supply) &&
                   !string.IsNullOrEmpty(model.temperature) &&
                   !string.IsNullOrEmpty(model.type);
        }
    }
}
