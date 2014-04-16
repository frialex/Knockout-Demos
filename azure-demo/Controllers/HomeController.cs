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

            return View();
        }

        //public ActionResult GetMenu()
        //{

        //    var json_path = Server.MapPath("/App_Data/FriMenu.json");
        //    using (StreamReader r = new StreamReader(json_path))
        //    {
        //        string json = r.ReadToEnd();
        //        Menu menu = JsonConvert.DeserializeObject<Menu>(json);

        //        return Json(menu, JsonRequestBehavior.AllowGet);
        //    }
        //}

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return PartialView();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return PartialView();
        }
    }
}