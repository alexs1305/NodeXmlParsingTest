var results = angular.module('results',[]);



results.controller("result-controller",function($scope, $http){
    $scope.allResults = {};

    $http.get('/getresults')
        .success(function(returnedResults) {
                $scope.allResults = returnedResults;
                console.log('posted results ' +  returnedResults);
            })


    $scope.sendResults = function() {
        $http.post('/addresult', $scope.formData)
            .success(function(returnedResults) {
                $scope.formData = {};
                $scope.allResults = returnedResults;
                console.log('posted results ' +  $scope.allResults);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


});
