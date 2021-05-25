using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FoodChooser.API.App_Start
{
    public class IoC
    {
        public static void Run()
        {
            SetAutofacWebAPIServices();
        }

        private static void SetAutofacWebAPIServices()
        {
            var configuration = GlobalConfiguration.Configuration;
            configuration.DependencyResolver = IoCStartup.ConfigureIoC();
        }
    }
}