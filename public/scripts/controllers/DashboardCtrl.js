'use strict';

angular.module('rubycoinRpiWallet')
    .controller('DashboardCtrl', function ($scope, $rootScope, $http, rubycoind) {
        $rootScope.app.curTitle = "Dashboard";

    }
);
