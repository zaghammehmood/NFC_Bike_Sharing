'use strict';

describe('app.rest module', function() {
    beforeEach(module('app.rest'));

    describe('rest service', function() {
        it('should return all station static info', inject(function(rest) {
            //rest.getStationInfo();  get all stations static info
        }));
        it('should return all stations dynamic info', inject(function(rest) {
            //rest.getStationsStatus();  get all stations static info
        }));
    });
});