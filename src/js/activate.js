var apiRoot = 'http://localhost/api';
var user_info = location.href.split('?')[1];

function getUserInfo(){
  $.ajax({
    url: apiRoot + '/auth/read/profile?' + user_info,
    type: 'GET',
    crossDomain: true,
    data: {},
    dataType: "json",
    success: function(result) {
      $('#activate-email').html(result.email);
      $('#activate-name').val(result.name);
    }
  });
}

