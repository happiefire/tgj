(function(){
  var app = angular.module('tgjapp', ['ngRoute', 'customFilters', 'dashboard', 'teachers', 'classes', 'exercises']);

  // route
  app.config(function($routeProvider, $httpProvider){
    $routeProvider
      .when('/', {
        // controller: 'DashboardController', 
        templateUrl: '/dashboard.html'
      })
      .when('/teachers', {
        controller: 'TeachersController', 
        templateUrl: '/teachers.html'
      })
      .when('/teachers/new', {
        controller: 'TeachersController', 
        templateUrl: '/teachers-new.html'
      })
      .when('/classes', {
        controller: 'ClassesController', 
        templateUrl: '/classes.html'
      })
      .when('/classes/new', {
        controller: 'ClassesController', 
        templateUrl: '/classes-new.html'
      })
      .when('/exercises', {
        controller: 'ExercisesController', 
        templateUrl: '/exercises.html'
      })
      .when('/exercises/new', {
        controller: 'ExercisesController', 
        templateUrl: '/exercises-new.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    // $http configuration
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  });
      
})();
