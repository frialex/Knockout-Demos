using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.IO; //StreamReader
using Newtonsoft.Json;
using azure_demo.Models;

namespace azure_demo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Request.IsAjaxRequest())
            {
                return PartialView(); 
            }
            return View();
        }

        public ActionResult MemoryLeak()
        {
            if(Request.IsAjaxRequest()){
                return PartialView();
            }
            return View();
        }

    }
}