using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http.Controllers;
using Autofac;
using Autofac.Integration.WebApi;
using FoodChooser.DbContext;
using FoodChooser.Repository;
using FoodChooser.Repository.Interface;

namespace FoodChooser.API.App_Start
{
    public class IoCStartup
    {
        public static AutofacWebApiDependencyResolver ConfigureIoC()
        {
            var builder = new ContainerBuilder();

            builder.RegisterApiControllers(Assembly.GetCallingAssembly());
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .Where(t => typeof(IHttpController).IsAssignableFrom(t) && t.Name.EndsWith("Controller"));

            builder.RegisterType<FoodChooserDbContext>().AsSelf().InstancePerLifetimeScope();

            builder.RegisterType<RecipeRepository>().As<IRecipeRepository>().InstancePerLifetimeScope();

            var container = builder.Build();
            var resolver = new AutofacWebApiDependencyResolver(container);

            return resolver;
        }
    }
}