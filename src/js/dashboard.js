(function(){
  var app = angular.module('dashboard', []);
  
  app.controller('greeting', ['$scope', '$http', function($scope, $http){
    $http.get('/api/auth/read/profile').success(function(data, status, headers, config){
      $scope.name = data.name;
      $scope.email = data.email;
    });
  }]);
})();