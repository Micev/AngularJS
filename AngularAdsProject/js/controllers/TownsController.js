app.controller('TownsController',['$scope','townData', function($scope, townData){
    townData.getTowns().$promise.then(function(data){
       $scope.towns = data;
    });
}]);
