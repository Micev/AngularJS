app.factory('townData', ['$resource', 'baseServiceUrl', function($resource, baseServiceUrl){
    var resources = $resource(baseServiceUrl + 'towns');
    function getAllTowns(){
        return resources.query();
    }
    return{
        getTowns : getAllTowns
    }
}]);