'use strict';

/**
 * Module declaring a service which uses HTTP requests and a controller using the service.
 *
 * The HTML template used for this is /views/ajax.html and is served from /ajax. The AJAX request calls /users.
 */

const angular = require('angular');
const app = angular.module('ajax', ['filters']);

/**
 * $http, $q and $window are built-in angular services. They are resolved automatically by the name of the variable
 * with Angular's dependency injection.
 *
 * The reason the names are repeated like this in the array is that if it is minified, the names of the variables are
 * lost.
 *
 * @see https://docs.angularjs.org/guide/di
 * @see https://docs.angularjs.org/api/ng/service/$http
 * @see https://docs.angularjs.org/api/ng/service/$q - Angular's promise library
 * @see https://docs.angularjs.org/api/ng/service/$window - just the browser's window object
 * @see http://www.html5rocks.com/en/tutorials/es6/promises/ - more about promises
 */
app.service('UsersService', ['$http', '$q', '$window', function ($http, $q, $window) {
    this.loaded = false;

    /**
     * The first time this is run, it loads the users from $window and returns an immediately resolved promise.
     * This is so that it has the same promise interface as a HTTP response.
     *
     * The second time it makes a HTTP request and again returns as a promise. This contains one more user to
     * simulate someone else adding a user between the page load and when you click the reload button.
     */
    this.getAll = function () {
        if (!this.loaded) {
            this.loaded = true;
            return $q.resolve($window.users);
        }

        return $http.get('/users').then(function (res) {
            // Return the actual users rather than the HTTP response object
            return res.data;
        });
    };

    /**
     * Doesn't actually make a HTTP request, but simulates it by returning a promise
     */
    this.add = function (user) {
        if (user.name == 'Jozsef') {
            // A promise can be rejected. HTTP requests will be reject if a 400+ code is sent.
            // You can catch these with .catch() on the end of the returned promise (see .catch() in addUser() below)
            return $q.reject('Jozsef is a bad man');
        }

        // Simulate a successful request
        return $q.resolve();
    };
}]);

/**
 * Controller which uses the UsersService. Again, the service is imported via Angular's DI.
 *
 * Arrow functions are used in this controller to preserve the reference to the this variable.
 *
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 */
app.controller('UsersController', ['UsersService', function (UsersService) {
    this.newUser = {
        'name': '',
        'department': '',
        'salary': 10000
    };

    this.users = [];
    this.error = null;

    /**
     * This is run automatically with ng-init and then manually with ng-click on the button.
     */
    this.load = function () {
        return UsersService.getAll().then((users) => {
            this.users = users;
        });
    };

    /**
     * Add a user (only on the page, not a real HTTP request) and then reload the list of users through AJAX
     */
    this.addUser = function () {
        return UsersService.add(this.newUser).then(() => {
            return this.load();
        }).then(() => {
            this.newUser = {
                'name': '',
                'department': '',
                'salary': 10000
            };
        // Error handler for the promise. Any error in any step of the promise and its callbacks will end up here.
        }).catch((e) => {
            this.error = e;
        });
    };

    this.deleteUser = function (user) {
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
    };
}]);