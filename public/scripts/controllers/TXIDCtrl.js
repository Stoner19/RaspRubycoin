'use strict';

angular.module('rubycoinRpiWallet')
    .controller('TXIDCtrl', function ($scope, $rootScope, $stateParams, rubycoind) {
        $rootScope.app.curTitle = "TXID Info";

        $scope.txid = $stateParams.txid;

        rubycoind.getRawTransaction($scope.txid)
            .then(function(response){
                $scope.rawtrans = response.data;

                rubycoind.decodeRawTransaction(response.data)
                    .then(function(response){
                        $scope.decodedtrans = response.data;
                    })

            });

        rubycoind.getTransaction($scope.txid)
            .then(function(response){
                $scope.gettransaction = response.data;
            });
    }
);
