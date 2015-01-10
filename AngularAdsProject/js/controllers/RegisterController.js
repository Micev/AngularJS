app.controller('RegisterController', ['$scope', '$location', 'townData','userData', 'notifications',  function($scope, $location, townData, userData, notifications){

    townData.getTowns().$promise.then(function(data){
        $scope.towns = data;
    });
    $scope.register = function(user){
        userData.register(user)
            .$promise
            .then(function(data){
                notifications.success('User account created successfully. ');
                $location.path('/');
            },
            function(data){
                notifications.error('Invalid Registration.');
            });
    };

    $scope.pageTitle = 'Register';
}]);