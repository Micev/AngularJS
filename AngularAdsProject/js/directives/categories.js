app.directive('categories', function(){
    return{
        controller : 'CategoriesController',
        restrict : 'E',
        templateUrl : 'template/public/categories.html',
        replace : true
    }
});