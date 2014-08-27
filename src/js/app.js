(function(){
  var app = angular.module('tgjapp', ['ngRoute', 'dashboard', 'teachers', 'classes', 'exercises']);

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

  app.filter('subjectFilter', function(){
    return function(subjectCode){
      if(subjectCode ==='math') { return '初中数学'; }
      else if(subjectCode ==='math2') { return '高中数学'; }
      else if(subjectCode ==='physics') { return '初中物理'; }
      else if(subjectCode ==='physics2') { return '高中物理'; }
      else if(subjectCode ==='chemistry') { return '初中化学'; }
      else if(subjectCode ==='chemistry2') { return '高中化学'; }
      else { return '未知学科'}
    }
  });

      
})();
