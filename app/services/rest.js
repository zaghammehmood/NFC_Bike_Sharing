angular.module('app.rest', [])

.factory('rest', ['$http', function($http){

    var service = {
        getStationInfo: getStationInfo,
        getStationsStatus: getStationsStatus
    };

    var basePath = 'https://gbfs.citibikenyc.com/gbfs/en';

    return service;

    function getStationInfo(){
        return request(basePath + '/station_information.json', 'GET', null);
    }

    function getStationsStatus() {
        return request(basePath + '/station_status.json', "GET");
    }

    function request(path, method, headers) {

        headers = headers || {};

        var conf = {
            method: method,
            url: path,
            cache: false,
            params: null,
            headers: headers
        };

        conf.headers['Content-Type'] = "application/json;charset=utf-8";

        return promiseThen($http(conf));
    }

    function promiseThen(httpPromise) {
        return httpPromise.then(function (response) {
            return response.data;                           // Return data back
        }).catch(function (response) {
            if (response.data) {
                console.error(JSON.stringify(response.data));
            } else {
                console.error(response);
            }
            // Return error data back
            return response;
        });
    }

}]);