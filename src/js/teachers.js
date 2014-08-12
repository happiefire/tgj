(function(){
  var app = angular.module('teachers', []);  
  var data = [
    {
      groupName: '所有教师',
      members: [
        {
          uid: '392414124',
          name: '孙佳骏',
          classNum: 5,
          subject: '数学'
        },
        {
          uid:'392414642',
          name: '张烁',
          classNum: 3,
          subject: '物理'
        }
      ]
    }
  ];

  app.controller('TeachersController', function(){
    this.groupIsOn = true;
    this.groupsList = data;
  });

})();
