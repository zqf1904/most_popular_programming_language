//sort the LineDate by date
function compareForSort(a,b){
  if (a.date == b.date)
    return 0;
  if (a.date < b.date)
    return -1;
  else
    return 1;
}

// set default options for ALL charts
function setChartDefaults(){
  // make it responsive
  Chart.defaults.global.responsive = true;
  // set the font color
  Chart.defaults.global.defaultFontColor = '#222';
  // set the font family
  Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
}

function buildDoughnutChart(data){
  // first, let's just render the overall counts on the page 
  $("#cCount").html(data.C);
  $("#ccCount").html(data.CC);
  $("#goCount").html(data.Go);
  $("#javaCount").html(data.Java);
  $("#jsCount").html(data.JavaScript);
  $("#objCount").html(data.Obj);
  $("#phpCount").html(data.PHP);
  $("#pythonCount").html(data.Python);
  $("#rubyCount").html(data.Ruby);
  $("#shellCount").html(data.Shell);

  // now, let's make the chart
  // a chart can take 2 objects:
  // 1. data - the data/information (required)
  // 2. options - chart options (optional)

  var data = {
      labels: ["Go","Objective-C","Shell","C","C++",
               "Ruby","PHP","Python","Java","JavaScript"],
      datasets: [{
        data: [data.Go, data.Obj, data.Shell, data.C, data.CC,
                 data.Ruby, data.PHP, data.Python, data.Java, data.JavaScript],
        backgroundColor:["#FF3333", "#B96163", "#3355FF", "#FF9633", "#FF33FF",
                         "#7A33FF", "#33FF86", "#33DDFF", "#FFE933","#B8FF33"]
        }]
  };

  // create chart options (this is optional)
  // see list of options:
  // http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
  var options = {
    legend: {
      position: 'bottom',
      labels: {
        fontColor: '#222',
        boxWidth: 12.5,
        padding: 20
      },
    },
    tooltips: {
        backgroundColor: '#222',
    },    
    animation:{
        animateScale:false
    }
  } 

  // first, get the context of the canvas where we're drawing the chart
  var ctx = document.getElementById("doughnutChart").getContext("2d");
  
  // now, create the doughnut chart, passing in:
  // 1. the type (required)
  // 2. the data (required)
  // 3. chart options (optional)
  var myDoughnutChart = new Chart(ctx,{
      type: 'doughnut',
      data: data,
      options: options
  });   
}

// see http://www.chartjs.org/docs/#line-chart-introduction
function buildLineChart(data){
  
  // first, let's prepare the data
  // let's pull out the labels we need; i.e. the dates
  var datesArray = [];
  data.forEach(function(e){
    datesArray.push(e.date)
  }); 

  //let's pull out the C stats we need
  var cArray = [];
  data.forEach(function(e){
    cArray.push(e.C);
  })

  //let's pull out the Go stats we need
  var goArray = [];
  data.forEach(function(e){
    goArray.push(e.Go);
  })

  //let's pull out the Java stats we need
  var javaArray = [];
  data.forEach(function(e){
    javaArray.push(e.Java);
  })

  //let's pull out the JavaScript stats we need
  var javascriptArray = [];
  data.forEach(function(e){
    javascriptArray.push(e.JavaScript);
  })

  //let's pull out the PHP stats we need
  var phpArray = [];
  data.forEach(function(e){
    phpArray.push(e.PHP);
  })

  //let's pull out the Python stats we need
  var pythonArray = [];
  data.forEach(function(e){
    pythonArray.push(e.Python);
  })

  //let's pull out the Ruby stats we need
  var rubyArray = [];
  data.forEach(function(e){
    rubyArray.push(e.Ruby);
  })

  //let's pull out the Shell stats we need
  var shellArray = [];
  data.forEach(function(e){
    shellArray.push(e.Shell);
  })

  //let's pull out the C++ stats we need
  var ccArray = [];
  data.forEach(function(e){
    ccArray.push(e.CC);
  })

  //let's pull out the Objective-C stats we need
  var objArray = [];
  data.forEach(function(e){
    objArray.push(e.Obj);
  })

  // now, let's make the chart
  // a chart can take 2 objects:
  // 1. data - the data/information (required)
  // 2. options - chart options (optional)

  var data = {
    // chart labels
    labels: datesArray,
    // an array of datasets to plot
    datasets: [
        {
            label: "Go",
            borderColor: "#FF3333",
            pointBackgroundColor: "#FF3333",
            backgroundColor: "#FF3333",
            pointRadius: 1,
            data: goArray
        },      
        {
            label: "C",
            borderColor: "#FF9633",
            pointBackgroundColor: "#FF9633",
            backgroundColor: "#FF9633",
            pointRadius: 1,          
            data: cArray
        },
        {
            label: "C++",
            borderColor: "#FF33FF",
            pointBackgroundColor: "#FF33FF",
            backgroundColor: "#FF33FF",
            pointRadius: 1,          
            data: ccArray
        },
        {
            label: "Objective-C",
            borderColor: "#B96163",
            pointBackgroundColor: "#B96163",
            backgroundColor: "#B96163",
            pointRadius: 1,          
            data: objArray
        }, 
        {
            label: "PHP",
            borderColor: "#33FF86",
            pointBackgroundColor: "#33FF86",
            backgroundColor: "#33FF86",
            pointRadius: 1,          
            data: phpArray
        },
        {
            label: "Python",
            borderColor: "#33DDFF",
            pointBackgroundColor: "#33DDFF",
            backgroundColor: "#33DDFF",
            pointRadius: 1,          
            data: pythonArray
        },
        {
            label: "Ruby",
            borderColor: "#7A33FF",
            pointBackgroundColor: "#7A33FF",
            backgroundColor: "#7A33FF",
            pointRadius: 1,          
            data: rubyArray
        },
        {
            label: "Java",
            borderColor: "#FFE933",
            pointBackgroundColor: "#FFE933",
            backgroundColor: "#FFE933",
            pointRadius: 1,          
            data: javaArray
        },
        {
            label: "JavaScript",
            borderColor: "#B8FF33",
            pointBackgroundColor: "#B8FF33",
            backgroundColor: "#B8FF33",
            pointRadius: 1,          
            data: javascriptArray
        },
        {
            label: "Shell",
            borderColor: "#3355FF",
            pointBackgroundColor: "#3355FF",
            backgroundColor: "#3355FF",
            pointRadius: 1,          
            data: shellArray
        },
    ]
  };  

  // create chart options (this is optional)
  // see list of options:
  // global: http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options
  // http://www.chartjs.org/docs/#line-chart-chart-options
  var options = {
    scales: {
            yAxes: [{
              stacked: true,
              ticks:{
                max: 100,
              },
            }]
          },
    legend: {
      position: 'bottom',
      labels: {
        fontColor: '#222',
        boxWidth: 12.5,
        padding: 20,
      },
    },
    tooltips: {
        backgroundColor: '#222',
    },
  } 

  // NOW, we actually create the chart
  // first, get the context of the canvas where we're drawing the chart
  var ctx = document.getElementById("lineChart").getContext("2d");
  
  // now, create the line chart, passing in:
  // 1. the type (required)
  // 2. the data (required)
  // 3. chart options (optional)
  var myLineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
  });
}

function formatDataForLineChart(data){
  var lineData = [];
  for (j = 0; j< data.length; j++){
    var firstData = data[j].doc;
    var realData = firstData.data;
    var secondData ={};
    secondData["date"] = firstData.update_date.substring(0,7);
    for (i=0; i< realData.length; i++){
      var name = realData[i].name;
      if (name == "C++"){
        secondData["CC"]=realData[i].repos_percent;
      }
      else if (name == "Objective-C"){
        secondData["Obj"]=realData[i].repos_percent;
      }
      else{
        secondData[name] = realData[i].repos_percent;
      }
    }
    lineData.push(secondData);
  }
  lineData = lineData.sort(compareForSort);
  buildLineChart(lineData);
}

function formatDataForDoughnut(data){
  var doughnutData = {};
  for (j = 0; j<data.length; j++){
    var name = data[j].name;
      if (name == "C++"){
        doughnutData["CC"]=data[j].repos;
      }
      else if (name == "Objective-C"){
        doughnutData["Obj"]=data[j].repos;
      }
      else{
        doughnutData[name]=data[j].repos;
      }
  }
  buildDoughnutChart(doughnutData);
}

function getLastMonthData(){
  $.ajax({
    url: '/lastmonth',
    type:'GET',
    dataType: 'json',
    error: function(err){
      console.log("Could not get data from the server :(");
      console.log(err);
      $("#rending").html("");
      $('#doughnutSection').html('Reaching API limits, please try few minutes later.')
    },
    success: function(data){
      var realData=data.data;
      formatDataForDoughnut(realData);
      var updateDate = data.update_date.substring(0,7);
      $("#rending").html("");
      $(".stats-holder").css('visibility', 'visible');
      $("#update-date").html(" (" + updateDate+")");
    }
  }); 
}

function getCloudantData(){
  $.ajax({
    url: '/api/all',
    type:'GET',
    dataType: 'json',
    error: function(err){
      console.log("Could not get data from the server :(");
      console.log(err);
    },
    success: function(data){
      formatDataForLineChart(data.rows);
    }
  });
}

$(document).ready(function(){
  getCloudantData();
  getLastMonthData();
});
  