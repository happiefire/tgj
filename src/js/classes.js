(function(){
  var app = angular.module('classes', []);  
  var data = [
    {
      uid:'aqwsed001',
      name:'高二基础班',
      size:'24',
      teacher:'孙佳骏'
    },
    {
      uid:'aqwsed002',
      name:'高一提高班',
      size:'19',
      teacher:'戴威'
    },
    {
      uid:'aqwsed003',
      name:'高二提高班',
      size:'22',
      teacher:'戴威'
    }
  ];

  app.controller('ClassController', function(){
    this.data = data;
  });

})();