'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('GithubAfrica.services', [])
    .value('version', '0.1')
    .service('BambooAPI', ['$q', '$rootScope', function ($q, $rootScope) {
        var applyScopeSafe = function (func) {
            if (!$rootScope.$$phase) {
                $rootScope.$apply(func);
            }
            else {
                func();
            }
        };

        return {
            queryInfo:function (dataset_id) {
                var deferred = $q.defer();
                var dataset = new bamboo.Dataset({id:dataset_id});
                dataset.query_info(function (result) {
                    applyScopeSafe(function () {
                        deferred.resolve(result);
                    });
                });
                return deferred.promise;
            },

            querySummary:function (dataset_id, select, group) {
                var deferred = $q.defer();
                var dataset = new bamboo.Dataset({id:dataset_id});
                dataset.summary(select, group, function (result) {
                    applyScopeSafe(function () {
                        deferred.resolve(result);
                    });
                });
                return deferred.promise;
            },

            queryCalculations:function (dataset_id) {
                var deferred = $q.defer();
                var dataset = new bamboo.Dataset({id:dataset_id});
                dataset.query_calculations(function (result) {
                    applyScopeSafe(function () {
                        deferred.resolve(result);
                    });
                });
                return deferred.promise;
            },

            addCalculation:function (dataset_id, name, formula) {
                var deferred = $q.defer();
                var dataset = new bamboo.Dataset({id:dataset_id});
                dataset.add_calculation(name, formula, function (result) {
                    applyScopeSafe(function () {
                        deferred.resolve(result);
                    });
                });
                return deferred.promise;
            },

            removeCalculation:function (dataset_id, name) {
                var dataset = new bamboo.Dataset({id:dataset_id});
                dataset.remove_calculation(name);
            }
        }
    }]);