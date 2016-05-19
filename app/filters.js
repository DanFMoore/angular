var angular = require('angular');
var filters = angular.module('filters', []);

filters.filter('toUpperCase', function () {
    return function (input) {
        return String(input).toUpperCase();
    };
});