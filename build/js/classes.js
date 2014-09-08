(function(){
  var app = angular.module('classes', []);  
  // var data = [
  //   {
  //     uid:'aqwsed001',
  //     name:'高二基础班',
  //     size:'24',
  //     teacher:'孙佳骏'
  //   },
  //   {
  //     uid:'aqwsed002',
  //     name:'高一提高班',
  //     size:'19',
  //     teacher:'戴威'
  //   },
  //   {
  //     uid:'aqwsed003',
  //     name:'高二提高班',
  //     size:'22',
  //     teacher:'戴威'
  //   }
  // ];

  app.controller('ClassesController', ['$scope', '$http', function($scope, $http){
    $scope.classes = [];
    $http({
      method: 'GET',
      url: '/api/teacher/list/class'
    })
    .error(function(data, status, headers, config){
      console.log("error");
    })
    .success(function(data,status,headers,config){
      console.log(data);
      $scope.classList = data.classes;
    })
  }]);

  // 现在该controller是针对教师设计，未考虑Manager的状况
  app.controller('CreateClassController', ['$scope', '$http', function($scope, $http){
    // 获取本用户姓名
    $http.get('/api/auth/read/profile').success(function(data, status, headers, config){
      $scope.teacherName = data.name;
    });
    // 这是个问题：为了获取教师所教授科目需要再请求一次，这不科学...
    $http.get('/api/teacher/read/teacher').success(function(data, status, headers, config){
      $scope.teacherSubject = data.subjects[0];
    });

    $scope.class = {};

    $scope.submit = function(){
      if($("#class-name").val()===""){
        alert("尚未填写班级名称～")
      }
      else{
        $http({
          method: 'POST',
          url: '/api/teacher/create/class',
          data:$.param({subject:$scope.teacherSubject,name:$scope.class.name}),
          headers:{
            "Content-Type":"application/x-www-form-urlencoded"
          }
        })
        .error(function(data, status, headers, config){
          console.log("error");
        })
        .success(function(data,status,headers,config){
          console.log($scope.teacherSubject);
          console.log($scope.class.name);
          $scope.getCode(data.class_id);
          console.log(data);
        })
      }
    };

    $scope.getCode = function(target){
      $http({
        method: 'GET',
        url: '/api/teacher/update/class/code/' + target,
      })
      .error(function(data, status, headers, config){
        console.log("error");
      })
      .success(function(data,status,headers,config){
        console.log('success');
        $scope.class.code = data.code;
      })
    };

  }]);  
})();