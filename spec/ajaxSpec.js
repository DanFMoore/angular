"use strict";

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
                'getAll': jasmine.createSpy('getAll').and.returnValue(Promise.resolve(this.users))
            };

            this.controller = $controller('UsersController', {
                UsersService: this.usersService
            });
        }));

        it('should load users', function (done) {
            this.controller.load().then(() => {
                expect(this.usersService.getAll).toHaveBeenCalled();
                expect(this.controller.users).toEqual(this.users);

                done();
            });
        });
    });

    describe('UsersService', function () {
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

            this.$httpBackend.flush();
        });
    });
});