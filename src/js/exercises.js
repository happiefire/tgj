(function(){
  var app = angular.module('exercises', []);  
  // var data = [
  //   {
  //     uid:'asdf001',
  //     name:'基础班摸底考',
  //     date:'2014/7/20',
  //     class:'高二数学基础班',
  //     status:'草稿'
  //   },
  //   {
  //     uid:'asdf002',
  //     name:'基础班期中考',
  //     date:'2014/7/14',
  //     class:'高一数学基础班',
  //     status:'14/16'
  //   },
  //   {
  //     uid:'asdf003',
  //     name:'提高班摸底考',
  //     date:'2014/6/20',
  //     class:'高一数学基础班',
  //     status:'20/20'
  //   }
  // ];

  app.controller('ExercisesController', ['$scope', '$http', function($scope, $http){
    $http({
      method: 'GET',
      url: '/api/teacher/list/exercise',
    })
    .error(function(data, status, headers, config){
      console.log("error");
    })
    .success(function(data,status,headers,config){
      console.log('success');
      $scope.exerciseList = data;
      console.log(data);
      //class_ids格式？
    })
  }]);

})();


//数据拿来先预处理，按时间排序。
//如果老师想要按照班级排序，他应该去班级页面查看

// $(function(){

//   $("#all").on("click",function(){
//     $(".done").css("display","block");
//   });

//   $("#craft").on("click",function(){
//     $(".done").css("display","none");
//   });

// });