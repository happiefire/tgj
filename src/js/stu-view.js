(function(){
  var app = angular.module('stu-view', []);  

  //老师评语的原始数据
  var comments = [
    {time:"3月10日",content:"最近进步很大!"},
    {time:"4月6日",content:"进步稳定，很聪明。但是上课请不要吃东西。"}
  ];

  //各板块练习情况的原始数据
  var catalog = [
    {
      name:"函数",
      error:"12/16",
      level:"B"
    },
    {
      name:"数列",
      error:"13/19",
      level:"B"
    },
    {
      name:"三角函数",
      error:"11/13",
      level:"A"
    },
    {
      name:"集合",
      error:"7/8",
      level:"A"
    },
    {
      name:"立体几何",
      error:"9/11",
      level:"A"
    },
    {
      name:"圆锥曲线",
      error:"10/17",
      level:"B"
    }            
  ];

  app.controller('CommentsController', function(){
    this.editOn = false;
    this.data = comments;
    this.toggleEdit = function(){
      this.editOn = !this.editOn;
    };
    this.submit = function(){
      this.toggleEdit();
      var newComment = {time:"5月7日",content:$("#comment-content").val()};
      this.data.unshift(newComment);
      $("#comment-content").val("");
    };
  });

  app.controller('CatalogController', function(){
    this.data = catalog;
  });

})();

//正确率趋势图
var errorData = {
  x:['3月5日','3月12日','3月19日','3月26日','4月2日','4月9日','4月16日','4月23日'],
  class:[60,65,70,50,65,80,65,70],
  student:[50,60,55,55,60,55,60,70]
};

//雷达图
var radarData = {
  x:['函数', '三角函数', '数列', '集合', '立体几何','圆锥曲线'],
  class:[40, 70, 51, 48, 63,84],
  student:[50,60, 44, 36, 75, 71]
};

//掌握程度趋势
var trackData = {
  x:['3月5日','3月12日','3月19日','3月26日','4月2日','4月9日','4月16日','4月23日'],
  y:[34,42,56,54,58,66,70,72] 
};


function gen_error_chart(datum){
  var errorOptions = {
    chart:{
      // type: 'line',
      renderTo: 'error'
    },
    title: {
            text: '正确率趋势图',
            x: -20 //center
    },
    xAxis: {
      title:{
        // text:'时间'
      },
        categories: datum.x
    },
    yAxis: {
        title: {
            text: '正确率'
        },
        min:0,
        max:100,
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
    shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: '全班',
        data: datum.class
    }, {
        name: '自己',
        data: datum.student
    }]
  };
  var chart = new Highcharts.Chart(errorOptions);
};

function gen_radar_chart(datum) {
  var radarOptions = {
    chart: {
          polar: true,
          type: 'line',
          renderTo:'radar'
    },
    
    title: {
        text: '知识点掌握程度',
        x: -40
    },
    
    pane: {
      size: '80%'
    },
    
    xAxis: {
        categories: datum.x,
        tickmarkPlacement: 'on',
        lineWidth: 0
    },
        
    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },
    
    tooltip: {
      shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
    },
    
    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
    },
    
    series: [{
        name: '自己',
        data: datum.student,
        pointPlacement: 'on'
    }, {
        name: '全班',
        data: datum.class,
        pointPlacement: 'on'
    }]
  };
  
  var chart = new Highcharts.Chart(radarOptions);
};

function gen_track_chart(datum){
  var trackOptions = {
    chart:{
      type: 'area',
      renderTo: 'track'
    },
    title: {
        text: '掌握程度趋势图',
        x: -20 //center
    },
    xAxis: {
      title:{
        // text:'时间'
      },
        categories: datum.x
    },
    yAxis: {
        title: {
            text: '掌握程度'
        },
        min:0,
        max:100,
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function() {
        return this.x + ': '+ this.y +'%</b>';
      }
    },
    plotOptions:{
      area:{
        marker:{
          enabled:true,
          symbol:'circle',
          radius:2,
        }
      }
    },
    series: [{
        name: '自己',
        data: datum.y
    }]
  };
  var chart = new Highcharts.Chart(trackOptions);
};


$(function(){
  gen_error_chart(errorData);
  gen_radar_chart(radarData);
  gen_track_chart(trackData);
});