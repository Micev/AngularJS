app.controller('LoginController', ['$scope','userData', function($scope, userData){
    $scope.login = function(user){
        userData.login(user);
    };

    $scope.pageTitle = 'Login';
}]);