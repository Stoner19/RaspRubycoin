'use strict';

angular.module('rubycoinRpiWallet')
    .controller('PeerInfoCtrl', function ($scope, $rootScope, rubycoind) {
        $rootScope.app.curTitle = "Peer Info";

        rubycoind.getPeerInfo()
            .then(function(response){
                console.log(response.data);
                $scope.peers = response.data;
            })
    }
);
