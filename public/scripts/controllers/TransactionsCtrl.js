'use strict';

angular.module('rubycoinRpiWallet')
    .controller('TransactionsCtrl', function ($scope, $rootScope, $http, $localStorage, $state, $stateParams, rubycoind) {
        $rootScope.app.curTitle = "Transactions";

        rubycoind.listAllTransactions()
            .then(function(response){
                $scope.transactions = response;
                $localStorage.transactions = response;
            });

        $state.reload = function reload() {
            $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
        };
    }
);
