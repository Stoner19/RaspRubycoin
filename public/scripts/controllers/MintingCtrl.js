'use strict';

angular.module('rubycoinRpiWallet')
    .controller('MintingCtrl', function ($scope, $rootScope, $localStorage, $state, $stateParams, rubycoind) {
        $rootScope.app.curTitle = "Minting";

        rubycoind.listMinting()
            .then(function(response){
                $localStorage.listMinting = response;
                $rootScope.listMinting = response;
            });

        $state.reload = function reload() {
            $state.transitionTo($state.current, $stateParams, { reload: true, inherit: true, notify: true });
        };
    }
);
