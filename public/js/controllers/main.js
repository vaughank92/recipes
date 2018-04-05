angular.module('recipeController', ['ngRoute'])
  .controller('mainController', function($scope, $http, Recipes) {
    $scope.formData = {};

    Recipes.get()
      .success(function(data) {
        $scope.recipes = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

      $scope.createRecipe = function() {
        if(!$.isEmptyObject($scope.formData)) {
          Recipes.create($scope.formData)
            .success(function(data) {
              $scope.formData = {};
              $scope.recipes = data;
            })
            .error(function(data) {
              console.log('Error: ' + data);
            });
        }
      };

      $scope.deleteRecipe = function(id) {
        Recipes.delete(id)
          .success(function(data) {
            $scope.recipes = data;
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/testing', {
        templateUrl: '../recipe.html'
      });
  });
