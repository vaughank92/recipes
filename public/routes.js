var displayApp = angular.module('displayApp', ['ngRoute']);

displayApp.config(function($routeProvider) {
  $routeProvider
  .when('/testing', {
    templateUrl : 'recipe.html',
    controller : 'mainController'
  });
});

displayApp.controller('mainController', function($scope) {
  $scope.message = 'testing here';
});
