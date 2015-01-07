app.factory('authentication',function(){

    function saveUserData(data){
        localStorage.setItem('user',angular.toJson(data));
    }

    function getUserData(data){
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
    }

    return{
        saveUser : saveUserData,
        getUser : getUserData,
        getHeaders : getHeaders,
        removeUser : removeUser
    }
});