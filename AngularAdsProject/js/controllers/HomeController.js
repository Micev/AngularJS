app.controller('HomeController', ['$scope','authentication', function($scope, authentication){
    $scope.pageTitle = 'Home';
    $scope.authentication = authentication;
    $scope.isLogged = authentication.isLogged();
}]);