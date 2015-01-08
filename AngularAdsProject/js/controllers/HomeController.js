app.controller('HomeController', ['$scope','authentication', function($scope, authentication){
    $scope.pageTitle = 'Home';
    $scope.isLogged = authentication.isLogged();
}]);