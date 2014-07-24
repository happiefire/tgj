uploadFile: function(e){

  var _this = this,
      files = e.target.files,
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
      console.log(_this.collection);
    },
    complete: function(){
      if (ajaxResult.ok) {
        _this.collection.reset();
        _.each(ajaxResult.students, function(obj){
          _this.collection.add({studentId: obj.id, studentName: obj.name});
        });
        _this.collection.trigger("refresh");
      } else {
        alert(ajaxResult.reason);
      }
    }
  });
  
}