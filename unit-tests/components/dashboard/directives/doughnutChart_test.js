'use strict';

describe('app.dashboard module', function() {
    beforeEach(module('app.dashboard'));

    describe('app-doughnut-chat directive', function() {
        it('should print current version', function() {
            module(function($provide) {

            });
            inject(function($compile, $rootScope) {
                expect(1).toEqual(1);
            });
        });
    });
});
