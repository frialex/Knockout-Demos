var test = {};

test.apiEndpoint = function (endpoint) {
    return $.get(endpoint, null, function (d) {
        debugger;
    });
};

test.fetchMenu = function () {
    return test.apiEndpoint('api/ui/menu');
}