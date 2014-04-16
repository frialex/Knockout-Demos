using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace azure_demo.Models
{
    public class Menu
    {
        public string Controller { get; set; }
        public string Action { get; set; }
        public string Title { get; set; }
        public string Tooltip { get; set; }
        public int Level { get; set; }
        public string IconClass { get; set; }
        public IList<Menu> SubMenu { get; set; }
        public string UrlLink { get; set; }
        public string ActionType { get; set; }

    }

}