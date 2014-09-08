(function(){
  var app = angular.module('editor', ['ui.router', 'ngSanitize', 'customFilters']);

  // route
  app.config(function($stateProvider, $httpProvider){
    $stateProvider
      .state('setting', {
        // controller: 'DashboardController', 
        url: '/setting',
        templateUrl: '/exercise-new-2.html'
      })
      .state('editor', {
        // controller: 'DashboardController', 
        url: '/editor',
        templateUrl: '/exercise-new-2.html'
      })
      .state('/editor/:exercise_id', {
        // controller: 'DashboardController', 
        url: '/editor/:exercise_id',
        templateUrl: '/exercise-new-2.html'
      });

    // $http configuration
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  });

  //上传试卷
  app.directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        
        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);





  app.controller("ExerciseEditController",['$scope', '$http', function($scope, $http){

    $scope.qtypeOptions = ['S', 'M', 'P'];
    $scope.setting = true;

  //目前只有单学科，取回老师的学科
    $scope.getSubject = function(){
      $http({
        method: 'GET',
        url: '/api/teacher/read/teacher',
      })
      .error(function(data, status, headers, config){
        console.log("error");
      })
      .success(function(data,status,headers,config){
        $scope.exercise_subject = data.subjects[0];
      });
    };

  //取回exercise数据
    $scope.getExercise = function(){
      $http({
        method: 'GET',
        url: '/api/teacher/read/exercise/' + $scope.exercise_id,
      })
      .error(function(data, status, headers, config){
        console.log("error");
      })
      .success(function(data,status,headers,config){
        $scope.exercise_name = data.name;
        $scope.exercise_class_ids = data.class_ids;
        $scope.exercise_subject = data.subject;
        console.log(data);
      });
    };

  //取回classes数据
    $scope.getClasses = function(){
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
    };

  //class checkbox的model绑定
    $scope.classIsIn = function(thisclass){
      if($scope.exercise_class_ids === undefined){
        return false;
      }
      else{
        var isIn = false;
        for(i=0;i<$scope.exercise_class_ids.length;i++){
          if(thisclass.class_id === $scope.exercise_class_ids[i]){
            isIn = true;
            break;
          }
        };
        // console.log($scope.exercise_class_ids);
        return isIn;
      }
    };

  //点击某个班级
    $scope.addClass = function(thisclass,$event){
      if($event.target.checked === true){
        $scope.exercise_class_ids.push(thisclass.class_id);
        console.log($scope.exercise_class_ids);
      }
      else{
        var index = $scope.exercise_class_ids.indexOf(thisclass.class_id);
        console.log(index);
        $scope.exercise_class_ids.splice(index,1);
        console.log($scope.exercise_class_ids);
      }
    };

  //取回exercise question
    $scope.getQuestions = function(){
      $http({
        method: 'GET',
        url: '/api/teacher/read/exercise/questions/' + $scope.exercise_id,
      })
      .error(function(data, status, headers, config){
        console.log("error");
      })
      .success(function(data,status,headers,config){
        $scope.problems = data.questions;
        $scope.checkPb();
        console.log(data);
      });
    };

  //新创建，create 名称和班级信息
    $scope.createExercise = function(){
      console.log($scope.exercise_name);
      console.log($scope.exercise_subject);
      console.log($scope.exercise_class_ids);

      $http({
        method: 'POST',
        url: '/api/teacher/create/exercise',
        data:$.param({
          name:$scope.exercise_name,
          subject:$scope.exercise_subject,
          class_ids: $scope.exercise_class_ids.join(",")
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
        //这个变量是为了避免这个controller被到处放
        $scope.exercise_id = data.exercise_id;
        console.log('exercise id:');
        console.log($scope.exercise_id);
        $scope.setting = false;
      });
    };

  //update 名称和班级信息
    $scope.updateExercise = function(){
      console.log($scope.exercise_name);
      console.log($scope.exercise_class_ids);

      $http({
        method: 'POST',
        url: '/api/teacher/update/exercise/'+$scope.exercise_id,
        data:$.param({
          name:$scope.exercise_name,
          // subject:$scope.exercise_subject,
          class_ids: $scope.exercise_class_ids.join(",")
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
        $scope.setting = false;
      });
    };

  //点击下一步
    $scope.submitInfo = function(){
      if($scope.exercise_name === ""){
        alert("尚未填写练习名称～");
      }
      else{
        if($scope.exercise_class_ids.length===0){
          alert("尚未选择班级～")
        }
        else{
          if($scope.exercise_id === undefined){
            $scope.createExercise();
          }
          else{
            $scope.updateExercise();
            $scope.getQuestions();
          }
        }
      }
    };

  //判断是否显示题目上传框
    $scope.checkPb = function(){
      if($scope.problems === null || $scope.problems === undefined){
        $scope.hasPb = false;
      }
      else{
        if($scope.problems.length === 0){
          $scope.hasPb = false;
        }
        else{
          $scope.hasPb = true;
        }
      };
      console.log($scope.hasPb);
      console.log($scope.problems);
    };

  //监测是否在有多个选项时候，将单选变成了多选
    $scope.$watch('problems',function(){
      if($scope.problems === undefined || $scope.problems === null){
        //do nothing
      }
      else{
        for(i=0;i<$scope.problems.length;i++){
          if($scope.problems[i].qtype === "S" && $scope.problems[i].answer.length>1){
            $scope.problems[i].answer = '';
            $scope.isAnswer($scope.problems[i],'A');
            $scope.isAnswer($scope.problems[i],'B');
            $scope.isAnswer($scope.problems[i],'C');
            $scope.isAnswer($scope.problems[i],'D');
          }
          else{
            if($scope.problems[i].qtype === "P"){
              $scope.problems[i].answer = '';
              $scope.isAnswer($scope.problems[i],'A');
              $scope.isAnswer($scope.problems[i],'B');
              $scope.isAnswer($scope.problems[i],'C');
              $scope.isAnswer($scope.problems[i],'D');
            }
          }
        }
      }
    }, true);

  //上传题目
    $scope.uploadFileToUrl = function(file, uploadUrl){
      var fd = new FormData();
      fd.append('file', file);
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function(data,status,headers,config){
        // $scope.problems = data.questions.slice(1,data.questions.length);
        $scope.problems = data.questions;
        $scope.checkPb();
        console.log($scope.problems);
      })
      .error(function(data,status,headers,config){
        console.log(data);
        $scope.checkPb();
        $scope.problems = null;
      });
    }

    $scope.uploadFile = function(){
      var file = $scope.myFile;
      console.log($scope.myFile);
      console.log('file is ' + JSON.stringify(file));
      var uploadUrl = '/api/teacher/upload/exercise/zip/'+$scope.exercise_id;
      $scope.uploadFileToUrl(file,uploadUrl);
    };


  //判断是否显示正确选项编辑
    $scope.hasChoice = function(pb){
      if(pb.qtype === "P"){
        return false
      }
      else{return true}
    };

  //选项与model的绑定
    $scope.isAnswer =function(pb,choice){
      var isIn = false;
      if(pb.answer.indexOf(choice) === -1){
        return false
      }
      else {return true}
    };

  //改变正确答案
    $scope.clickChoice = function(pb,target){

      //修改model中的正确答案
      var choice = $(target).html();
      if(!$scope.isAnswer(pb,choice)){ //注意，有感叹号哦
        pb.answer = pb.answer + $(target).html();
        console.log(pb.answer);
      }
      else{
        var index = pb.answer.indexOf(choice);
        pb.answer = pb.answer.slice(0,index)+pb.answer.slice(index+1,pb.answer.length);
        console.log(pb.answer);
      };

      //根据答案的个数自动改变题型
      if(pb.answer.length>1){
        pb.qtype = "M"
      }
    };

  //最终提交题目与答案
    $scope.submitPb = function(){
      $http({
        method: 'POST',
        url: '/api/teacher/update/exercise/questions/'+$scope.exercise_id,
        data:$scope.problems
      })
      .error(function(data, status, headers, config){
        console.log(data);
      })
      .success(function(data,status,headers,config){
        console.log(data);
      });
      $http({
        method: 'POST',
        url: '/api/teacher/update/exercise/'+$scope.exercise_id,
        data:$.param({status:"O"}),
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        }
      })
      .error(function(data, status, headers, config){
        console.log(data);
      })
      .success(function(data,status,headers,config){
        console.log(data); 
        history.go(-1);
      }); 
    };


  //获取exercise_id
    if(location.href.indexOf('=') === -1){
      $scope.exercise_id = undefined;
      $scope.getSubject();
      $scope.exercise_class_ids = [];
      $scope.getClasses();
    }
    else{
      $scope.exercise_id = location.href.substr(location.href.indexOf('=')+1,location.href.length);
      $scope.getExercise();
      $scope.getClasses();
    };




  }]);

})();
