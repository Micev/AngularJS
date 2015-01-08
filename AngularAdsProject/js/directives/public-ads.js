app.directive('publicAdd', function () {
    return{
        controller : 'PublicAdsController',
        restrict : 'E',
        templateUrl : 'template/public/public-ads.html',
        replace : true
    }
});