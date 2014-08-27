(function(){
  var app = angular.module('editor', ['ngRoute', 'customFilters']);

  // route
  app.config(function($routeProvider, $httpProvider){
    $routeProvider
      .when('/setting', {
        // controller: 'DashboardController', 
        templateUrl: '/exercise-new-1.html'
      })
      .when('/editor', {
        // controller: 'DashboardController', 
        templateUrl: '/exercise-new-2.html'
      })
      .otherwise({
        redirectTo: '/setting'
      });

    // $http configuration
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  });

})();
