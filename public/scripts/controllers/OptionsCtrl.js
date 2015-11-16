'use strict';

angular.module('rubycoinRpiWallet')
    .controller('OptionsCtrl', function ($scope, $rootScope, rubycoind) {
        $rootScope.app.curTitle = "Options";

        $scope.addserver = function(){
            rubycoind.addserver($scope.newserver)
                .then(function(response){
                    console.log(response);
                });
        }

    }
);
