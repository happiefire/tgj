(function(){
  var app = angular.module('teacherInfo', []);  
  var data = 
      {
        uid: '392414124',
        name: '孙佳骏',
        comment: '擅长数学',
        contactInfo: {
          phoneNum: '15201011111',
          email: 'sunjiajun@gmail.com'
        },
        classes: [
          {
            id: '101',
            name: '数学基础班'
          },
          {
            id: '102',
            name: '数学提高班'
          }
        ]
      }

  app.controller('TeacherInfoController', function(){
    this.data = data;
  });

})();
