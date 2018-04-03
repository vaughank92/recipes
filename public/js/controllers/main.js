angular.module('recipeController', [])
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
  });
