'use strict';

/**
 * Module declaring a filter. Filters don't have to be in their own module, this was also to demonstrate
 * modules being included as dependencies for other modules.
 *
 * @see https://docs.angularjs.org/guide/filter
 * @see https://docs.angularjs.org/tutorial/step_09
 */

const angular = require('angular');
const filters = angular.module('filters', []);

/**
 * This is used in HTML with {{ value | toUpperCase }}.
 *
 * The first parameter is always the value before |. For other arguments, you use this syntax
 * (assuming variables with those names)(:
 *
 * {{ value | toUppercase:second:third }}.
 *
 * To call from with a controller / service etc within JS code, you can import $filter and then call:
 *
 * $filter('toUpperCase')(input);
 */
filters.filter('toUpperCase', function () {
    return function (input) {
        return String(input).toUpperCase();
    };
});