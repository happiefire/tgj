$("input[type='file']").on('click',function(){
  $("button[type='button']").trigger('click');  
});
$('li#toggle-upload').on('click', function(){
  $('#upload-name-list-view').show();
  $('#input-name-list-view').hide();
  $(this).addClass('active');
  $('li#toggle-input').removeClass('active');
});
$('li#toggle-input').on('click',function(){
  $('#input-name-list-view').show();
  $('#upload-name-list-view').hide();
  $(this).addClass('active');
  $('li#toggle-upload').removeClass('active');
});
$('button#class-teacher').popover({
  placement:"right",
  delay: { "show": 500, "hide": 100 },
  template: '<div class="popover" role="tooltip"><div class="arrow"></div><h1 class="popover-title"></h1><div class="popover-content"></div></div>'

});




$('#file-input-field').on("change", uploadFile);

function uploadFile(event){
  var _this = this,
      files = event.target.files,
      prefix = 'http://42.96.165.209:8192',
      url = prefix+'/api/parse/students/xlsx',
      postData = new FormData();

  postData.append('data', files[0]);
  console.log("check this:");

  $.ajax({
    url: url,
    type: 'POST',
    data: postData,
    crossDomain: true,
    cache: false,
    dataType: "json",
    processData: false,
    contentType: false,
    success: function(result) {
      ajaxResult = result;
      console.log(result);
    },
    complete: function(){
      // if (ajaxResult.ok) {
      //   _this.collection.reset();
      //   _.each(ajaxResult.students, function(obj){
      //     _this.collection.add({studentId: obj.id, studentName: obj.name});
      //   });
      //   _this.collection.trigger("refresh");
      // } else {
      //   alert(ajaxResult.reason);
      // }
    }
  });
}