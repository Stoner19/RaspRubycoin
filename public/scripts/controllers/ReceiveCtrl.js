'use strict';

angular.module('rubycoinRpiWallet')
    .controller('ReceiveCtrl', function ($scope, $rootScope, $localStorage, $state, $stateParams, rubycoind) {
        $rootScope.app.curTitle = "Receive";

        $scope.listAccounts = function() {
            rubycoind.listAccounts()
                .then(function (response) {
                    $scope.accounts = response;
                    $localStorage.accounts.serverIndex = $localStorage.chosenServerIndex;
                    $localStorage.accounts = response;
                });
        };

        $scope.listAccounts();

        $scope.newReceiveAddress = function(label){
            rubycoind.getNewAddress(label)
                .then(function(response){
                    console.log(response);
                    $scope.listaccounts();
                });
        };

        $state.reload = function reload() {
            $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
        };
    }
);
