(function(){
  var app = angular.module('exercise-new-2', []);
  var data = [
    {
      id:'asdf001',
      no:1,
      type:"选择题",
      text:'这是一道题的题干',
      choices:[
        {
          number:"A",
          content:"choice a",
          isCorrect:false
        },
        {
          number:"B",
          content:"choice b",
          isCorrect:false
        },
        {
          number:"C",
          content:"choice c",
          isCorrect:true
        },
        {
          number:"D",
          content:"choice d",
          isCorrect:false
        }
      ],
    },
    {
      id:'asdf002',
      no:2,
      type:"选择题",
      text:'这是一道题的题干',
      choices:[
        {
          number:"A",
          content:"choice a",
          isCorrect:false
        },
        {
          number:"B",
          content:"choice b",
          isCorrect:true
        },
        {
          number:"C",
          content:"choice c",
          isCorrect:true
        },
        {
          number:"D",
          content:"choice d",
          isCorrect:false
        }
      ],
    },
    {
      id:'asdf001',
      no:1,
      type:"主观题",
      text:'这是一道题的题干',
      choices:[]
    }
  ];

  app.controller('PbController', function(){
    this.data = data;

    this.changeType = function(pb){
      pb.type = $(event.target).val();
      console.log(pb.type);
    };

    this.selectAnswer = function(choice,pb){
      choice.isCorrect = !choice.isCorrect;
      console.log(this.correctAnswer(pb));
    };

    this.correctAnswer = function(pb){
      var correctAnswer = [];
      for(i=0;i<pb.choices.length;i++){
        if(pb.choices[i].isCorrect === true){
          correctAnswer.push(pb.choices[i].number);
        }
      };
      return correctAnswer;
    };

    this.isMultiChoice = function(pb){
      var correctAnswer = this.correctAnswer(pb);
      if(correctAnswer.length > 1 && pb.type === "选择题"){
        return true
      }
      else{return false}
    };

    this.markCorrect = function(choice,pb){
      if(choice.isCorrect === true && pb.type === "选择题"){
        return true
      }
      else{return false}
    }

  });

})();