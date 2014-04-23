var AppMenu = function AppMenu() {
	var self = this;
    
	self.load = function (data) {
	    ko.applyBindings(data.SubMenu, document.getElementById('TopNavContainer'));

	    test.instantiateDlMenu();
	};

	function createDOMLink() {
	    var $root = $("#dl-menu");
	}

	self.itemHasIcon = function(item){
	    if (item === null || item.length === 0 ) {
	        return false;
	    } else {
            return true
	    }
	}

	return self;
};

var AppMenuInstance = new AppMenu();

//Request menu on refresh, to save one click during debugging
$.get("/api/ui/getmenu")
 .done(AppMenuInstance.load)
 .fail(function () { alert("error loading menu"); });