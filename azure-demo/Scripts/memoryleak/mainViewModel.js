var leaker = new (function () {
    var self = this;
    
    self.replace = function () {
        $.get('/home/memoryleak', null, function (data) {
            ko.cleanNode(document.getElementById('bodyContent'));
            $("#bodyContent").html(data);

            //var container = document.createElement('div');
            //container.innerHTML = data; //does this trigger binding?
        });
    }

})();

var viewClass = function viewClass() {
    var self = this;
   
    self.cleanNode = function (viewContext) {
        debugger; //run ko.cleanNode on the template container to get rid of ko.domData entries for this?
    };

    self.subscriptions = [];
    
    self.showfirstArray = ko.observable(true);
    self.showSecondArray = ko.observable(false);
    var arraySwitchSub = self.showSecondArray.subscribe(function firstArraySecondArraySub(newValue) {
        self.showfirstArray(!newValue);
        this.displayName = "Subscription to showSeconndArray"; //http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
    });
    self.subscriptions.push(arraySwitchSub); //Memory leak #1 sub scriptions that are not disposed when creating new vm. See bellow when instantiating vm
    self.changeObservable = function (viewContext) {
        self.showSecondArray(self.showfirstArray()); //TODO: Not using peek, does that create a dependency?
    };

    self.switchTemplates = function (viewModelInstanceContext) {
        //debugger;
        var current = self.templateName();
        if (current === 't1') {
            self.templateName('t2');
        } else if (current === 't2') {
            self.templateName('t1');
        }
    }

    self.templateName = ko.observable('t1');

    self.firstArray = ['FIRST ARRAY'];
    for (var i = 0; i < 20; i++) {
        var d = new Date();
        self.firstArray.push( i + "th element: "+d.getMinutes()+":"+ d.getSeconds()+":"+ d.getMilliseconds()+"ms" );
    }

    self.secondArray = ['SECOND ARRAY'];
    for(var i = 20; i < 40;  i++){
        var d2 = new Date();
        self.secondArray.push( i + "th element: "+d.getMinutes()+":"+ d.getSeconds()+":"+ d.getMilliseconds()+"ms" );
    }

    self.thirdArray = ['THIRD ARRAY'];
    for(var i = 40; i < 60;  i++){
        var d2 = new Date();
        self.thirdArray.push( i + "th element: "+d.getMinutes()+":"+ d.getSeconds()+":"+ d.getMilliseconds()+"ms" );
    }
    
    return self;
};

//Memory Leak #1: if second if statement is uncommented, then the first instance of viewModel is never disposed
//if (viewModelInstance !== undefined) {
if(false){
    //not first. dispose of the old viewModelInstance, since it has subscriptions
    viewModelInstance.subscriptions.forEach(function (sub) {
        console.log("Disposing Callback: " + sub.callback.name + " [value: " + sub.target._latestValue + "]" );
        sub.dispose();
    });
   
    //look for all the observables and dispose them
    for (var i in viewModelInstance) {
        if (viewModelInstance[i].name !== undefined ) {
            if (viewModelInstance[i].name === 'observable') {
                console.log("FOUND OBSERVABLE: " + viewModelInstance[i]._subscriptions);
                //debugger;
            } else if (viewModelInstance[i].name === 'computed') {
                debugger;
            } else if (viewModelInstance[i].name === 'dependentObservable') {
                debugger;
            }
        }
    }

    delete viewModelInstance; //TODO: measure vs = null
}

var viewModelInstance = new viewClass();
ko.cleanNode(document.getElementById('bodyContent'));
ko.applyBindings(viewModelInstance, document.getElementById('bodyContent'));



var watchDogStartTime;
function koDomDataWatchDog() {
    console.log("DomData Length: " + Object.keys(ko.utils.domData.peek()).length);
}
var koDomDataWatchDogTimer;
function startKoDomDataWatchDog() {
    console.log("Starting KO watch dog");
    watchDogStartTime = new Date();
    koDomDataWatchDogTimer = setInterval(koDomDataWatchDog, 2000);
}
function stopKoDomDataWatchDog() {
    clearInterval(koDomDataWatchDogTimer);
    var d = new Date();
    console.log("Watch dog started @(min:sec:ms) " + watchDogStartTime.getMinutes() + ":" + watchDogStartTime.getSeconds() + ":" + watchDogStartTime.getMilliseconds());
    console.log("Watch dog stopped @(min:sec:ms) " + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds());
    return ko.utils.domData.peek();
}

startKoDomDataWatchDog();



//Get rid of those VM###.js in chrome by associating this with a file name
//@ sourceURL=demo-site.local/Scripts/memoryleak/mainViewModel.js