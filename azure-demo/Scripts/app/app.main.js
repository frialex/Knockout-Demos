var AppCore = function AppCore() {
	var self = this;

	self.PageLoad = function (data, status) {
	    var appctx = self; //create closure. Is this gced?
	    $('.body-content').html(data);
	}

	return self;
};

var AppCoreInstance = new AppCore();