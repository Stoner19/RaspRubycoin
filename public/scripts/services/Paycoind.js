angular.module('PaycoinRpiWallet')
    .factory('paycoind', function($http, $q){

        var service = {
            serverIndex: -1,
            setServerIndex: setServerIndex,
            getInfo: getInfo,
            listTransactions: listTransactions,
            listAccounts: listAccounts,
            getServerInfo: getServerInfo,
            listAllTransactions: listAllTransactions,
            listMinting: listMinting,
            addServer:addServer,
            sendToAddress: sendToAddress,
            saveSendAddress: saveSendAddress,
            saveDataJSON: saveDataJSON,
            unlock: unlock,
            walletlock: walletlock,
            basicInfo: {}
        };

        function unlock(passphrase, timeout){
            var deferred = $q.defer();

            var payload = {
                index: this.serverIndex,
                passphrase: passphrase,
                timeout: timeout
            };

            $http.post('/api/unlock', payload)
                .then(function(response){
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function walletlock(){
            $http.post('/api/walletlock',{index:this.serverIndex})
                .then(function(response){
                    console.log("wallet lock response");
                    console.log(response);
                })
        }

        function sendToAddress(sendPayload){

            var deferred = $q.defer();

            $http.post('/api/sendtoaddress', sendPayload)
                .then(function(response){
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function saveSendAddress(address, label){
            var deferred = $q.defer();

            var payload = {
                index: this.serverIndex,
                label: label,
                address: address
            };

            $http.post('/api/addtoaddressbook', payload)
                .then(function(response){

                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function saveDataJSON(){

        }

        function addServer(newserver){
            var deferred = $q.defer();
            $http.post('/api/addserver', newserver)
                .then(function(response){
                    deferred.resolve(response.data);
                });
            return deferred.promise;
        }

        function listAllTransactions(){
            var deferred = $q.defer();
            $http.post('/api/listalltransactions', { 'index' : this.serverIndex, 'account': '*'} )
                .then(function(response){
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function setServerIndex(index){
            this.serverIndex = index;
        }

        function getInfo(){
            var deferred = $q.defer();
            $http.post('/api/getinfo',  { 'index' : this.serverIndex })
                .then(function(response){
                    service.basicInfo = response.data;
                    deferred.resolve(response.data);
                });
            return deferred.promise;
        }

        function listTransactions(qty){
            var deferred = $q.defer();

            if(qty == null)
                qty = 10;

            $http.post('/api/listrecenttransactions',  {'index':this.serverIndex, qty: parseInt(qty)})
                .then(function(response){
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function listAccounts(){
            var deferred = $q.defer();
            $http.post('/api/listaccounts',  {'index':this.serverIndex})
                .then(function(response){
                    var accounts = response.data;

                    var payload = {
                        'index':service.serverIndex,
                        'account':''
                    };

                    accounts.forEach(function(key){
                        payload.account = key.name;

                        $http.post('/api/getaddressesbyaccount', { 'index':service.serverIndex, 'account': key.name })
                            .then(function(response){
                                key.addresses = response.data;
                            });
                    });

                    deferred.resolve(accounts);
                });

            return deferred.promise;
        }

        function getServerInfo(){
            var deferred = $q.defer();
            $http.post('/api/getserverlist',  {'index':this.serverIndex})
                .then(function(response){
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function listMinting(){
            var deferred = $q.defer();

            $http.post('/api/listminting', {'index':this.serverIndex})
                .then(function(response){
                   deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        return service;
    }
);