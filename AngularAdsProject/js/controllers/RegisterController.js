app.controller('RegisterController', ['$scope', 'townData','userData', function($scope, townData, userData){
    townData.getTowns().$promise.then(function(data){
        $scope.towns = data;
    });
    $scope.register = function(user){
        userData.register(user);
    };
    $scope.pageTitle = 'Register';
}]);