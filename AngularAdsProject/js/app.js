var app = angular.module('adsApp', ['ngRoute', 'ngResource', 'LocalStorageModule', 'angular-extended-notifications']);

app.constant('baseServiceUrl',  'http://softuni-ads.azurewebsites.net/api/');

app.config(['$routeProvider','localStorageServiceProvider', 'notificationsProvider', function($routeProvider, localStorageServiceProvider, notificationsProvider){
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
    $routeProvider.when('/user/ads',{
        templateUrl: 'template/userAds.html',
        controller : 'UserAdsController'
    });
    $routeProvider.when('/user/ads/publish',{
        templateUrl: 'template/publishNewAd.html',
        controller : 'PublishNewAdController'
    });
    $routeProvider.when('/user/ads/delete',{
        templateUrl: 'template/deleteAd.html',
        controller : 'UserAdsController'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });

    localStorageServiceProvider.setStorageType('localStorage');

    notificationsProvider.setDefaults({
        // set the directory containing the html templates
        templatesDir: 'node_modules/angular-extended-notifications/templates/',
        // use font-awesome icons
        faIcons: true,
        // close notifications on route change
        closeOnRouteChange: 'route' // or 'state' using uiRouter…
    });
}]);