/**
* abstackVarLib Module
*
* Description: main
*/
angular.module('abstackVarLib', [])
    .filter('keywords', function(){
        return function(input, type){
            if(!type)
                return input;

            var temp = [];
            for(var i = 0;i<input.length;i++){
                if(input[i].tags.join().indexOf(type) != -1)
                    temp.push(input[i]);
            }

            return temp;
        }
    })
    .controller('mainCtrl', ['$http', '$scope', function($http, $scope){

        $http.get('/json/words.json')
            .success(function(data){
                $scope.wordsList = data;
            });

        $scope.setKeywords = function(tag){
            $scope.keywords = tag;
        }


    }]);