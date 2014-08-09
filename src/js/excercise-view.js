(function(){
  var app = angular.module('item-view-tea', []);  

  var namelist = [
    {
      name:"扫地僧",
      rank:"1",
      errorpb:"5",
      level:"A"
    },
    {
      name:"张无忌",
      rank:"2",
      errorpb:"3,4,5",
      level:"B"
    },
    {
      name:"令狐冲",
      rank:"3",
      errorpb:"2,3,4,5",
      level:"B"
    },
    {
      name:"袁承志",
      rank:"-",
      errorpb:"未交卷",
      level:"-"
    }
  ];

  app.controller('NamelistController', function(){
    this.data = namelist;
  });

})();

var pbData = {
  x:[1,2,3,4,5,6,7,8,9,10],
  y:[3,2,3,6,9,8,10,14,16,11]
};

function gen_pb_chart(datum){
  var pbOptions = {
    chart: {
      type: 'column',
      renderTo:'pb'
    },
    title: {
      text: '题目错误人数统计'
    },
    xAxis: {
      title:{
        text:'题号'
      },
      categories: datum.x,
      labels: {
        align: 'right',
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: '错误人数'
      }
    },
    plotOptions:{
      series:{groupPadding:0.05}
    },
    legend: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
      return '第<b>'+ this.x +
        '题</b> : <b>'+ this.y +'人</b>';
      }
    },
    series: [{
      data: datum.y,
    }]
  };
  var chart = new Highcharts.Chart(pbOptions);
};


$(function(){
  gen_pb_chart(pbData);
});