'use strict';

var angular = require('angular');
var app = angular.module('ajax', ['filters']);

app.service('UsersService', ['$http', '$q', '$window', function ($http, $q, $window) {
    this.loaded = false;

    this.getAll = function () {
        if (!this.loaded) {
            this.loaded = true;
            return $q.resolve($window.users);
        }

        return $http.get('/users').then(function (res) {
            return res.data;
        });
    };

    this.add = function (user) {
        // Simulate a http response
        if (user.name == 'Jozsef') {
            return $q.reject('Jozsef is a bad man');
        }

        return $q.resolve();
    };
}]);

app.controller('UsersController', ['UsersService', function (UsersService) {
    this.newUser = {
        'name': '',
        'department': '',
        'salary': 10000
    };

    this.users = [];
    this.error = null;

    this.load = function () {
        return UsersService.getAll().then((users) => {
            this.users = users;
        });
    };

    this.addUser = function () {
        return UsersService.add(this.newUser).then(() => {
            return this.load();
        }).then(() => {
            this.newUser = {
                'name': '',
                'department': '',
                'salary': 10000
            };
        }).catch((e) => {
            this.error = e;
        });
    };

    this.deleteUser = function (user) {
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
    };
}]);