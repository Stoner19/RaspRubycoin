'use strict';

angular.module('rubycoinRpiWallet')
    .controller('UnlockWalletCtrl', function ($scope, $rootScope, $localStorage, rubycoind) {
        $rootScope.app.curTitle = "Unlock Wallet";

        $scope.unlock = function() {

            if($scope.stakingOnly == null) {
                $scope.stakingOnly = false;
            }

            $localStorage.chosenServer.locked = true;
            $localStorage.chosenServer.stakingOnly = $scope.stakingOnly;

            rubycoind.unlock($scope.passphrase, $scope.duration, $scope.stakingOnly)
                .then(function (response) {
                    console.log("unlock response");
                    console.log(response);

                    if(response.data.error){
                        $scope.error = response.data.error.msg;
                    } else {
                        $scope.success = true;
                    }

                })
        }
    }
);
