/**
* abstackVarLib Module
*
* Description: main
*/
angular.module('abstackVarLib', ['zeroclipboard'])
    .config(['uiZeroclipConfigProvider', function(uiZeroclipConfigProvider) {
        // config ZeroClipboard
        uiZeroclipConfigProvider.setZcConf({
          swfPath: '../bower_components/zeroclipboard/dist/ZeroClipboard.swf'
        });
    }])
    .directive('readyFocus', ['$document', function($document){
        return {
            restrict: 'A',
            link: function($scope, iElm, iAttrs, controller) {
                $document.ready(function(){
                   iElm[0].focus(); 
                });
            }
        };
    }])
    .directive('backspaceFocus', function(){
        return {
            restrict: 'A',
            link: function($scope, iElm, iAttrs, controller) {
                var targetObj = document.getElementById(iAttrs['backspaceFocus']);

                iElm[0].onkeydown = function(ev){
                    var event = ev || event,
                        keyCode = event.keyCode;
                    if(keyCode == 8 && targetObj){
                        targetObj.focus();
                    }
                };
            }
        };
    })
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
    .controller('mainCtrl', ['$timeout', '$http', '$scope', function($timeout, $http, $scope){

        $http.get('/json/words.json')
            .success(function(data){
                $scope.wordsList = data;
            });

        $scope.setKeywords = function(tag){
            $scope.keywords = tag;
        }

        $scope.copiedWord = function(word){
            word.copyTip = 'COPIED !';
            $timeout(function(){
                delete word.copyTip;
            }, 1500);
        }
    }]);