'use strict';

var angular = require('angular');
var app = angular.module('app', ['filters']);

app.controller('UsersController', function () {
    this.newUser = {
        'name': '',
        'department': '',
        'salary': 10000
    };

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
        }
    ];

    this.addUser = function () {
        this.users.push(this.newUser);

        this.newUser = {
            'name': '',
            'department': '',
            'salary': 10000
        };
    };

    this.deleteUser = function (user) {
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
    };
});