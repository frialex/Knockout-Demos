using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Diagnostics;

using System.IO;
using m = azure_demo.Models;
using Newtonsoft.Json;
using System.Web.Hosting;  //HostingEnvironment

namespace azure_demo.Controllers.api
{
    public class UIController : ApiController
    {
        public UIController()
        {
            Trace.WriteLine("In api/UIController");
        }

        //public IHttpActionResult GetTest()
        //{
        //    return Ok("All Good");
        //}

        public m.Menu GetMenu()
        {
            string path = HostingEnvironment.MapPath("/App_Data/FriMenu.json");
            using(StreamReader r = new StreamReader(path) )
            {
                var json = r.ReadToEnd();
                m.Menu menu = JsonConvert.DeserializeObject<m.Menu>(json);

                return menu;
            }

        }
    }
}
