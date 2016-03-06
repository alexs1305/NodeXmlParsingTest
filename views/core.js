var results = angular.module('results',[]);



results.controller("result-controller",function($scope, $http){
    $scope.allResults = {};
    $scope.allTitles = {};

    $http.get('/getresults')
        .success(function(returnedResults) {
                $scope.allResults = returnedResults;
                console.log('posted results ' +  $scope.allResults);
               })
   $http.get('/gettitles')
    .success(function(returnedTitles){
        $scope.allTitles = returnedTitles;
    });


    $scope.sendResults = function() {
        $http.post('/addresult', $scope.formData)
            .success(function(returnedResults) {
               $scope.formData = {};
               $scope.allResults = returnedResults;
               })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    $scope.getAllResults = function(){
        $http.get('/getresults')
                .success(function(returnedResults) {
                        $scope.allResults = returnedResults;
                        console.log('posted results ' +  $scope.allResults);
                       });
    };

    $scope.filterResults = function(filterResults){
        $http.post('/filterresults/'+filterResults)
            .success(function(returnedResults) {
             $scope.formData = {};
             $scope.allResults = returnedResults;
             console.log('posted results ' +  $scope.allResults);
                                       });
             };



});
