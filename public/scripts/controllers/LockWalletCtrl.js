'use strict';

angular.module('rubycoinRpiWallet')
    .controller('LockWalletCtrl', function ($scope, $rootScope, $localStorage, rubycoind) {
        $rootScope.app.curTitle = "Lock Wallet";

        $scope.walletLock = function() {

            $localStorage.chosenServer.locked = true;
            $localStorage.chosenServer.stakingOnly = false;

            rubycoind.walletLock()
                .then(function (response) {
                    console.log(response);
                    $scope.response = response.data;
                })
        }
    }
);
