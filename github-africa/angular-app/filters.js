'use strict';


angular.module('GithubAfrica.filters', []).
    filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);