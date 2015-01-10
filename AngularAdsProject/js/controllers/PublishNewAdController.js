app.controller('PublishNewAdController',['$scope', '$location', 'adsData', 'townData', 'categoriesData', 'notifications', 'authentication', function($scope, $location, adsData, townData, categoriesData, notifications, authentication) {
    $scope.isLogged = authentication.isLogged();
    $scope.authentication = authentication;
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
    $scope.pageTitle = 'Publish New Ad';
}]);