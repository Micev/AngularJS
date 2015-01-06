app.controller('RegisterController', ['$scope', 'townData', function($scope, townData){
    townData.getTowns().$promise.then(function(data){
        $scope.towns = data;
    });
    $scope.register = function(user){
        console.log(user)
    };
    $scope.pageTitle = 'Register';
}]);