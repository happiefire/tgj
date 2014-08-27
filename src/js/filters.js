(function(){
  var app = angular.module('customFilters', []);
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
