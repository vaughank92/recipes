angular.module('recipeService', [])
  .factory('Recipes', function($http) {
    return {
      get : function() {
        return $http.get('/api/recipes');
      },
      create : function(recipeData) {
        return $http.post('/api/recipes', recipeData);
      },
      delete : function(id) {
        return $http.delete('/api/recipes/' + id);
      }
    }
  });
