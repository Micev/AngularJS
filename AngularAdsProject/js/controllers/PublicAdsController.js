app.controller('PublicAdsController',['$scope','adsData', 'filter', function($scope, adsData, filter){
    $scope.ready= false;
    function loadPublicAds(filterParams){
        filterParams = filterParams || {};

        adsData.getPublicAds(filterParams).$promise.then(function(data){
            $scope.adsData = data;
            $scope.ready= true;
        });
    }
    loadPublicAds();

    $scope.$on('categoryClicked', function(category){
        loadPublicAds(filter.getFilterParams());
    });
    $scope.$on('allCategoryClicked', function(category){
        loadPublicAds({});
    });
    $scope.$on('townClicked', function(town){
        loadPublicAds(filter.getFilterParams());
    });
    $scope.$on('allTownClicked', function(category){
        loadPublicAds({});
    });


}]);