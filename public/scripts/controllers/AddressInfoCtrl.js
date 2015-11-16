'use strict';

angular.module('rubycoinRpiWallet')
    .controller('AddressInfoCtrl', function ($scope, $rootScope,$stateParams, rubycoind) {
        $rootScope.app.curTitle = "Address Info";

        $scope.address = $stateParams.address || "";

        rubycoind.listAddressTransactions($scope.address)
            .then(function(response){
                console.log(response);
                $scope.listTransactions = response;
            })
    }
);
