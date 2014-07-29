(function(){
  var app = angular.module('class', []);  
  var data = [
    {
      tag:'高中数学',
      class:[
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
      ]
    },

    {
      tag:'高中物理',
      class:[
        {
          uid:'zxcvasdf001',
          name:'初二提高班',
          size:'17',
          teacher:'王成'
        },
        {
          uid:'zxcvasdf002',
          name:'高二提高班',
          size:'23',
          teacher:'王成'
        }
      ]
    }
  ];

  app.controller('ClassController', function(){
    this.info = data;
  });

})();