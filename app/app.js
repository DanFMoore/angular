'use strict';

/**
 * Simple module with one controller. The HTML template used for this is /views/index.html and is served from /
 *
 * It shows a list of users, allows you to delete them with the "Delete" link and add new users with the form.
 *
 * The form has basic validation, will show error messages when text is deleted and only allow numbers for salary.
 */

var angular = require('angular');

/**
 * Create a module called app which uses the filters module (filters.js) as a dependency.
 * Although not used in this file, a filter from filters.js is used in the HTML template for this page.
 * The name of the module is used in an ng-app directive in HTML. Only elements inside that element can use this module.
 *
 * @see https://docs.angularjs.org/guide/module
 */
var app = angular.module('app', ['filters']);

/**
 * The name of the controller is used an ng-controller directive in HTML.
 * Only elements inside that element can use this controller.
 * This controller uses this instead of $scope, which is possible with the "Controller as" syntax
 *
 * @see https://docs.angularjs.org/guide/controller
 * @see https://toddmotto.com/digging-into-angulars-controller-as-syntax/
 */
app.controller('UsersController', function () {
    /**
     * This is controlled from the new user form. Updating the fields will update the values here immediately
     * (two way data binding)
     */
    this.newUser = {
        'name': '',
        'department': '',
        'salary': 10000
    };

    /**
     * This is looped over in HTML with ng-repeat on the li tag
     */
    this.users = [
        {
            // I have added an input for each user's name which shows the two-way data binding.
            // Updating the input updates this.
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

    /**
     * This is called from the HTML with ng-submit on the form tag
     */
    this.addUser = function () {
        this.users.push(this.newUser);

        this.newUser = {
            'name': '',
            'department': '',
            'salary': 10000
        };
    };

    /**
     * This is called from the HTML with ng-click on the word "Delete"
     *
     * @param {Object} user
     */
    this.deleteUser = function (user) {
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
    };
});