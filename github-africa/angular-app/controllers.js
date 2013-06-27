'use strict';

/* Controllers */

angular.module('GithubAfrica.controllers', [])
    .controller('MainCtrl', ['$scope', 'BambooAPI', function ($scope, BambooAPI) {
        $scope.data = [];
        var dataset_id = "e14a193ef3db4aa58645c2b2b4665344";
        var select = {};
        select['country_name'] = 1;
        var promise = BambooAPI.querySummary(dataset_id, select);
        promise.then(function(result){
            var values = [];
            Object.keys(result['country_name'].summary).forEach(function(key, index){
                values.push({label: key, value: result['country_name'].summary[key]});
            });
            values.sort(function(a, b){
               return a.value < b.value?1:-1;
            });
            $scope.data = [{
                key: "Countries",
                color: '#4183C4',
                values: values
            }];
        });
    }]);