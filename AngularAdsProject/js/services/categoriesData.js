app.factory('categoriesData', ['$resource', 'baseServiceUrl', function($resource, baseServiceUrl){
    var resources = $resource(baseServiceUrl + 'categories');

    function getCategories(){
        return resources.query();
    }
    return{
        getCategories : getCategories
    }
}]);