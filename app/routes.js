'use strict';

var angular = require('angular');
var routes = angular.module('routes', ['ngRoute']);

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

routes.controller('UserController', ['UsersService', '$routeParams', function (UsersService, $routeParams) {
    this.user = null;

    UsersService.get($routeParams.userId).then((user) => {
        this.user = user;
    });
}]);