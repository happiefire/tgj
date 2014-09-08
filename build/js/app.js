(function(){

  var app = angular.module('tgjapp', ['ui.router', 'customFilters', 'dashboard', 'teachers', 'classes', 'exercises']);

  // route
  app.config(function($stateProvider, $httpProvider, $urlRouterProvider){
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: '/dashboard.html'
      })
      .state('teachers', {
        url: '/teachers',
        templateUrl: '/teachers.html',
        controller: 'TeachersController'
      })
      .state('teachers.new', {
        url: '/new',
        controller: 'TeachersController', 
        templateUrl: '/teachers-new.html'
      })
      .state('classes', {
        url: '/classes',
        controller: 'ClassesController', 
        templateUrl: 'template-classes'
      })
      .state('classes-new', {
        url: '/classes/new',
        controller: 'ClassesController', 
        templateUrl: 'template-classes-new'
      })
      .state('exercises', {
        url: '/exercises',
        controller: 'ExercisesController', 
        templateUrl: 'template-exercises'
      });

    $urlRouterProvider.otherwise('/');

    // $http configuration
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  });
      
})();
