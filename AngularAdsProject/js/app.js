var app = angular.module('adsApp', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api/');

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: 'template/home.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/login', {
        templateUrl: 'template/login.html',
        controller: 'LoginController'
    });
    $routeProvider.when('/register', {
        templateUrl: 'template/register.html',
        controller: 'RegisterController'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);