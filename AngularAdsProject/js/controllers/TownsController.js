app.controller('TownsController',['$scope', '$rootScope', 'townData', 'filter', function($scope, $rootScope, townData, filter){
    townData.getTowns().$promise.then(function(data){
       $scope.towns = data;
    });

    $scope.townClicked = function (town){
        filter.filterByTown(town);
        $rootScope.$broadcast('townClicked', town);
    }
    $scope.allTownClicked = function (town){
        $rootScope.$broadcast('allTownClicked', town);
    }
}]);
