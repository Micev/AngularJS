app.directive('leftSidebar', function(){
    return{
        controller : 'HomeController',
        restrict : 'E',
        templateUrl : 'template/public/left-sidebar.html',
        replace : true
    }
});