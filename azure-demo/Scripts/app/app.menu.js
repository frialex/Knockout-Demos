var AppMenu = function AppMenu() {
	var self = this;
        
	self.load = function (data) {
	    //debugger;

	    ko.applyBindings(data.SubMenu, document.getElementById('HomeContainer'));
	};

	return self;
};

var AppMenuInstance = new AppMenu();