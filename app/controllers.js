var angular = require('angular');
var app = angular.module('app', []);

app.controller('UsersController', function () {
    this.newUser = {
        'name': '',
        'department': ''
    };

    this.users = [
        {
            'name': 'Bob',
            'department': 'IT'
        },
        {
            'name': 'Clive',
            'department': 'Management'
        }
    ];

    this.addUser = function () {
        this.users.push(this.newUser);

        this.newUser = {
            'name': '',
            'department': ''
        };
    };

    this.deleteUser = function (user) {
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
    };
});