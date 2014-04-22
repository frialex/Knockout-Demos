//Heap profile @number is not the same as VMnumber (which is just a sequential convenience label)

var HomeVM = function HomeVM() {
    var self = this;
	//debugger; 

    self.message = ko.observable("knockout Binding");

    return self;
}

var HomeVMInstance = new HomeVM();

ko.applyBindings(HomeVMInstance, document.getElementById('HomeContainer'));

