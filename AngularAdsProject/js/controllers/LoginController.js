app.controller('LoginController', ['$scope','$location', 'userData', 'notifications', function($scope, $location, userData, notifications){
    $scope.login = function(user){
        userData.login(user)
            .$promise
            .then(function success(data){
                $location.path('/');
                notifications.success('Login success.');
            },function error(data){
                console.error('Failure!', data);
                notifications.error('Invalid Login', data.error);
            });
    };

    $scope.pageTitle = 'Login';
}]);