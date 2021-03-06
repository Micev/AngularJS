app.controller('UserAdsController',['$scope', '$location', 'adsData', 'townData', 'categoriesData', 'notifications', 'authentication', function($scope, $location, adsData, townData, categoriesData, notifications, authentication) {
    $scope.isLogged = authentication.isLogged();
    $scope.authentication = authentication;
    $scope.ready= false;
    townData.getTowns().$promise.then(function(data){
        $scope.towns = data;
    });
    categoriesData.getCategories().$promise.then(function(data){
        $scope.categories = data;
    });
    $scope.add = function (ad) {
        adsData.add(ad)
            .$promise
            .then(function (data) {
                notifications.success('Ad added: ' + data);
                $location.path('/');

            },
            function (data) {
                notifications.error("Invalid publish ad");
            });
    };
    function loadUserAds(){
        adsData.getUserAds().$promise.then(function(data){
            $scope.adsData = data;
            $scope.ready= true;
        });
    }

    loadUserAds();

    function deleteAd(data){
        adsData.getAdById(data).$promise.then(function(data){
            $scope.adsData = data;

        });
    }
    $scope.pageTitle = 'My Ads';
    $scope.pageDeleteTitle = 'Delete Ad';
}]);
