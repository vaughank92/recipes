var recipeModule = angular.module('recipeModule', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/recipes')
    .success(function(data) {
      $scope.recipes = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createRecipe = function() {
    $http.post('/api/recipes', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.recipes = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    };

  $scope.deleteRecipe = function(id) {
    $http.delete('/api/recipes/' + id)
      .success(function(data) {
        $scope.recipes = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

}
