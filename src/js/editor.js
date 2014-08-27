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




  app.controller("ExerciseNewController",['$scope', '$http', function($scope, $http){

    $scope.exercise = {name:'',class_ids:[],subject:null};

    //取回classes数据
    $http({
      method: 'GET',
      url: '/api/teacher/list/class',
    })
    .error(function(data, status, headers, config){
      console.log("error");
    })
    .success(function(data,status,headers,config){
      $scope.classes = data.classes;
      console.log(data);
    });

    //目前只有单学科，取回学科
    $http({
      method: 'GET',
      url: '/api/teacher/read/teacher',
    })
    .error(function(data, status, headers, config){
      console.log("error");
    })
    .success(function(data,status,headers,config){
      $scope.exercise.subject = data.subjects[0];
    });

    $scope.submit = function(){
      console.log($scope.exercise.name);
      if($scope.exercise.name === ""){
        alert("尚未填写练习名称～");
      }
      else{
        //找出class
        for(i=0;i<$scope.classes.length;i++){
          if($scope.classes[i].checked===true){
            $scope.exercise.class_ids.push($scope.classes[i].class_id)
          }
        };

        if($scope.exercise.class_ids.length===0){
          alert("尚未选择班级～")
        }
        else{
          //真正的submit
          console.log($scope.exercise.name);
          console.log($scope.exercise.subject);
          console.log($scope.exercise.class_ids);
          $http({
            method: 'POST',
            url: '/api/teacher/create/exercise',
            data:$.param({
              name:$scope.exercise.name,
              subject:$scope.exercise.subject,
              class_ids: $scope.exercise.class_ids.join(",")
            }),
            headers:{
              "Content-Type":"application/x-www-form-urlencoded"
            }
          })
          .error(function(data, status, headers, config){
            console.log(data);
          })
          .success(function(data,status,headers,config){
            console.log(data);
          });
        }
      }
    };

    $scope.checkClass = function(thisclass,target){
      if($(target).is(":checked")){
        thisclass.checked=true;
        // console.log(thisclass);
        // console.log(thisclass.checked);
      }
      else{
       thisclass.checked=false;
       // console.log(thisclass);
       // console.log(thisclass.checked);
      }
    };

  }]);

  app.controller("ExerciseEditController",['$scope', '$http', function($scope, $http){
    //此乃假数据
    $scope.problems = [
      {
        orderNum:"1",
        bodyHTML:"此乃题干。ABCD",
        type:"单选题",
        correctAnswer:[]
      },
    ];

    //更改题型
    $scope.changeType = function(pb){
      pb.type = $(event.target).val();
      console.log(pb.type);
    };

    //判断是否显示正确选项编辑
    $scope.hasChoice = function(pb){
      if(pb.type === "主观题" || pb.type===null){
        return false
      }
      else{return true}
    };

    $scope.clickChoice = function(pb,target){
      for(i=0;i<pb.correctAnswer.length;i++){
        if(pb.correctAnswer[i]===$(target).html()){
          pb.correctAnswer.splice(i,1);
          break;
        }
      };
      //把颜色标绿或取消
      $(target).toggleClass("selected");

      //修改model中的正确答案
      if($(target).hasClass("selected")){
        pb.correctAnswer.push($(target).html());
        console.log(pb.correctAnswer);
      }
      else{
        for(i=0;i<pb.correctAnswer.length;i++){
          if(pb.correctAnswer[i]===$(target).html()){
            pb.correctAnswer.splice(i,1);
          }
        };
        console.log(pb.correctAnswer);
      };

      //根据答案的个数自动改变题型
      if(pb.correctAnswer.length>1){
        pb.type = "不定项选择题";
      }

    }

  }]);

})();
