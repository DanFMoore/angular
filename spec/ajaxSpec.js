"use strict";

/**
 * Jasmine tests. Config is defined in karma.conf.js
 *
 * @see https://docs.angularjs.org/guide/unit-testing
 * @see http://jasmine.github.io/2.0/introduction.html
 */

describe('Ajax Module', function () {
    beforeEach(module('ajax'));

    beforeEach(function () {
        this.users = [
            {
                'name': 'Bob'
            }
        ];
    });

    describe('UsersController', function () {
        beforeEach(inject(function ($controller){
            this.usersService = {
                // Jasmine spies are the equivalent of mocks in PHP
                // @see http://jasmine.github.io/2.0/introduction.html#section-Spies
                'getAll': jasmine.createSpy('getAll').and.returnValue(Promise.resolve(this.users))
            };

            // Inject mocks into the controller
            this.controller = $controller('UsersController', {
                UsersService: this.usersService
            });
        }));

        // Done allows for async testing. if done isn't called within a few seconds, then the test fails
        it('should load users', function (done) {
            this.controller.load().then(() => {
                expect(this.usersService.getAll).toHaveBeenCalled();
                expect(this.controller.users).toEqual(this.users);

                done();
            });
        });
    });

    /**
     * Service testing, if using $http is a bit more fiddly.
     *
     * @see https://docs.angularjs.org/api/ngMock/service/$httpBackend
     */
    describe('UsersService', function () {
        // It's also more fiddly to inject dependencies as $service doesn't exist like $controller does
        beforeEach(module(($provide) => {
            this.$window = {
                'users': [
                    {
                        'name': 'Jim'
                    }
                ]
            };

            $provide.value("$window", this.$window);
        }));

        beforeEach(inject(function($injector) {
            // Set up the mock http service responses
            this.$httpBackend = $injector.get('$httpBackend');
            this.$httpBackend.when('GET', '/users').respond(this.users);

            this.$rootScope = $injector.get('$rootScope');
            this.service = $injector.get('UsersService');
        }));

        it('should load from $window the first time it is called', function (done) {
            this.service.getAll().then((users) => {
                expect(users).toEqual([
                    {
                        'name': 'Jim'
                    }
                ]);

                done();
            });

            // This needs to be run the resolve the promise
            this.$rootScope.$digest();
        });

        it('should load from HTTP the second time it is called', function (done) {
            this.service.getAll().then(() => {
                return this.service.getAll();
            }).then((users) => {
                expect(users).toEqual([
                    {
                        'name': 'Bob'
                    }
                ]);

                done();
            });

            // This needs to be run to resolve the simulated HTTP request
            this.$httpBackend.flush();
        });
    });
});