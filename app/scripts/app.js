/**
* abstackVarLib Module
*
* Description: main
*/
angular.module('abstackVarLib', [])
    .controller('mainCtrl', ['$http', '$scope', function($http, $scope){

        $http.get('/json/words.json')
            .success(function(data){
                $scope.wordsList = data;
            });


    }]);