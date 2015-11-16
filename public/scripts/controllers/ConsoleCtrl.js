'use strict';

angular.module('rubycoinRpiWallet')
    .controller('ConsoleCtrl', function ($scope, $rootScope, $localStorage, rubycoind) {
        $rootScope.app.curTitle = "Console... with Buttons!";

        $scope.checkWallet = function(){
            rubycoind.checkWallet()
                .then(function(response){
                    $scope.checkWalletResponse = response.data;
                });
        };

        $scope.listUnspent = function(){
            rubycoind.listUnspent()
                .then(function(response){
                    $scope.listUnspentResponse = response.data;
                })
        }
    }
);
