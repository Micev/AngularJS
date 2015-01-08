app.directive('towns', function(){
   return{
       controller : 'TownsController',
       restrict : 'E',
       templateUrl : 'template/public/towns.html',
       replace : true
   }
});