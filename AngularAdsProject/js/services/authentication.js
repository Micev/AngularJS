app.factory('authentication',function($window){

    function saveUserData(data){
        localStorage.setItem('user',angular.toJson(data));
    }

    function getUserData(){
       return angular.fromJson(localStorage.getItem('user'));
    }

    function getHeaders(argument) {
        var header = {};
        var userData = getUserData();
        if (userData) {
            header.Authorization = "Bearer " + getUserData().access_token;
        }
        return header;
    }

    function removeUser() {
        localStorage.removeItem('user');
        $window.location.reload();
    }

    function isLogged(){
        return !!getUserData();
    }

    return{
        saveUser : saveUserData,
        getUser : getUserData,
        getHeaders : getHeaders,
        removeUser : removeUser,
        isLogged : isLogged
    }
});