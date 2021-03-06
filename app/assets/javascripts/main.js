var app = angular.module('app', ['ngAnimate','ui.router']);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

    $stateProvider
    .state('home',{
        url: '/',
        controller: 'mainCtrl'
    })
    .state('item', {
        url: '/{:name}',
        controller: 'itemCtrl'
    });


    $urlRouterProvider.otherwise("/");
}]);

app.factory('Portfolio', ['$http', function ($http){
    return {
        getAll: function() {
            return $http.get('/api/portfolioItems');
        },
        getSingle: function(name) {
            return $http.get('/api/portfolioItems/' + name);
        }
    };
}]);

app.controller('mainCtrl', ['$scope','Portfolio', function ($scope, Portfolio){
    console.log("Welcome to the main controller");
    Portfolio.getAll().success(function(data){
        $scope.portfolioItems = data;

        console.log($scope.portfolioItems);
    });

    Portfolio.getSingle().success(function(data){
        $scope.portfolioItem = data;

        console.log($scope.portfolioItem);
    });

}]);