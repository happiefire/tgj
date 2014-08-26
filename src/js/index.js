// config apiRoot and makePostFunction
var apiRoot = 'http://localhost/api';

function makePostFunction(apiPath, getPostData, successCallback){
  return function() {
    var postData = getPostData();
    $.ajax({
      url: apiRoot + apiPath,
      type: 'GET',
      crossDomain: true,
      data: postData,
      dataType: "json",
      success: function(result) {
        successCallback(result);
        console.log(postData);
      }
    });
  }
}
// end config

var doLogin = makePostFunction(
  '/auth/login', 
  function(){
    var postData = {};
    postData.username = $('#login-email').val();
    postData.password = $('#login-password').val();
    return postData;
  },
  function(result){
    if(result.ok){
      location.href = 'http://localhost/app.html';
    } else {
      alert(result.error);
    }
  }
);

$('#do-login-btn').click(function(){
  doLogin();
});

$('#login-password').on('keyup', function(e){
  if(e.keyCode==13){
    $("#do-login-btn").trigger("click");
  }
});

function whoami(){
  $.ajax({
    url: apiRoot + '/auth/read/profile',
    type: 'GET',
    crossDomain: true,
    data: {},
    dataType: "json",
    success: function(result) {
      console.log(result);
    }
  });
}