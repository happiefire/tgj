(function(){
var app = angular.module('teachers', []);
// var data = [
//   {
//     groupName: '所有教师',
//     members: [
//       {
//         uid: '392414124',
//         name: '孙佳骏',
//         classNum: 5,
//         subject: '数学'
//       },
//       {
//         uid:'392414642',
//         name: '张烁',
//         classNum: 3,
//         subject: '物理'
//       }
//     ]
//   }
// ];

app.controller('TeachersController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
  console.log('TeachersController init!');

  // 用于teachers.html
  $scope.popoverIn = false;
  $scope.popoverShow = false;
  $scope.popoverToggle = function(){
    if($scope.popoverShow === false){
      $scope.popoverShow = true;
      $timeout(function(){$scope.popoverIn = true;}, 100);
    } else {
      $scope.popoverIn = false;
      $timeout(function(){$scope.popoverShow = false;}, 100);
    }
  };

  $http({
    method: 'GET',
    url: '/api/manager/list/teacher',
  })
  .success(function(data,status,headers,config){
    console.log(data.teachers);
    $scope.teacherList = data.teachers;
  });









  //用于teachers-new.html
  // $scope.newTeachers = [
  //   {
  //     name:"adsf",
  //     email:"a@a.a",
  //     remark:"asdf"
  //   }
  // ];

  // $scope.appendRow = function(){
  //   var blank = {};
  //   $scope.newTeachers.push(blank);
  //   console.log($scope.newTeachers);
  // };

  // $scope.valify = function(){
  //   for(i=0;i<$scope.newTeachers.length;i++){
  //     if($scope.newTeachers[i].email === "" && ($scope.newTeachers[i].name!="" && $scope.newTeachers[i].remark!="")){
  //       alert("邮箱是必填项!");
  //     }
  //     else{}
  //   }
  // };

  // $scope.submitOne = function(target){
  //   $http({
  //     method: 'POST',
  //     url: '/api/manager/create/teacher',
  //     data: $.param({name:target.name,email:target.email}),
  //     headers:{
  //       "Content-Type":"application/x-www-form-urlencoded"
  //     }
  //   })
  //   .error(function(data, status, headers, config){
  //     console.log("error");
  //     console.log(target);
  //   })
  //   .success(function(data,status,headers,config){
  //     console.log(data);
  //   })
  // };

  // $scope.submit = function(){
  //   $scope.valify();
  //   for(i=0;i<$scope.newTeachers.length;i++){
  //     if($scope.newTeachers[i].email!=undefined){
  //       console.log($scope.newTeachers[i]);
  //       $scope.submitOne($scope.newTeachers[i])
  //     }
  //   };
  // };

}]);

})();
