'use strict';

/**
 * Module which uses routes, which allow different controllers with different parameters to be loaded
 * when changing the hash fragment. This is the basis for building single page applications.
 *
 * The HTML template used for this is /views/routes.html and is served from /routes.
 *
 * @see https://docs.angularjs.org/tutorial/step_07
 * @see https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
 */

const angular = require('angular');

/**
 * Import the ngRoute module which contains the routing functionality.
 * This also requires another script to be loaded in the HTML (angular-route.js).
 *
 * @see https://docs.angularjs.org/api/ngRoute
 */
const routes = angular.module('routes', ['ngRoute']);

/**
 * Set up the routes. The urls are the hash fragments.
 *
 * :userId is a parameter available as $routeParams.userId in the controller.
 *
 * The templates are found in /public/templates and are loaded via AJAX
 *
 * Whenever a different hash fragment is navigated to, the controller function will be run again.
 */
routes.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/users', {
            templateUrl: '/templates/users.html',
            controller: 'UsersController as u'
        })
        .when('/users/:userId', {
            templateUrl: '/templates/user.html',
            controller: 'UserController as u'
        })
        .otherwise({
            redirectTo: '/users'
        });
}]);

/**
 * Simulates HTTP requests using $q to create promises
 */
routes.service('UsersService', ['$q', function ($q) {
    this.users = [
        {
            'name': 'Bob',
            'department': 'IT',
            'salary': 10000
        },
        {
            'name': 'Clive',
            'department': 'Management',
            'salary': 50000000
        },
        {
            'name': 'James Lockhart',
            'department': 'Experimental Development',
            'salary': 90000
        },
        {
            'name': 'Peter Weir',
            'department': 'Wallboard',
            'salary': 12000
        }
    ];

    this.getAll = function () {
        return $q.resolve(this.users);
    };

    this.get = function (index) {
        if (this.users[index]) {
            return $q.resolve(this.users[index]);
        }

        return $q.reject("User not found");
    };
}]);

routes.controller('UsersController', ['UsersService', function (UsersService) {
    this.users = [];

    UsersService.getAll().then((users) => {
        this.users = users;
    });
}]);

/**
 * $routeParams is the angular service to get the parameters passed in from the URL.
 *
 * @see https://docs.angularjs.org/api/ngRoute/service/$routeParams
 */
routes.controller('UserController', ['UsersService', '$routeParams', function (UsersService, $routeParams) {
    this.user = null;

    UsersService.get($routeParams.userId).then((user) => {
        this.user = user;
    });
}]);