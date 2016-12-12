var express = require('express');
var app = express();
var logger = require('morgan');
var Request = require('request');

// *************************
// CONFIGURATIONS
// *************************
app.use(logger('dev'));

app.set("views", __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static( __dirname + '/public' ));

var port = process.env.PORT || 3000;

// *************************
// TEMP DATABASE
// *************************
var dataArray = {
  "update_date":0,
  "data":[],
};

var languageName = ["JavaScript","Ruby","Python","C%2B%2B","Java","PHP","Go",
                    "C","Objective-C","Shell"];

var cloudant_USER = 'zqf1904';
var cloudant_DB = 'trend_lan';
var cloudant_KEY = 'toolventywaseelyncermdly';
var cloudant_PASSWORD = '9648f5b29f93098cbd00917dec69356101b62016';

var cloudant_URL = "https://" + cloudant_USER + ".cloudant.com/" + cloudant_DB;

// *************************
// FUNCTIONS
// *************************

// returning a string that represnts time in the correct format for API calls
function timeForApi(){
  var thismonth = new Date();
  var yyyy = thismonth.getFullYear();
  var mm = thismonth.getMonth()+1;
  var dd = "01";

  var lm = thismonth.getMonth();
  var lyyy = yyyy;

  if (mm<10){
    mm= "0"+mm;
  }

  if (thismonth.getMonth() === 0){
    lm = "12";
    lyyy = yyyy -1;
  }
  else if (lm <10){
    lm = "0"+lm;
  }

  var enddate = yyyy + "-" + mm + "-" + dd;
  var startdate = lyyy + "-" +lm + "-" +dd; 

  var lastMonth = startdate + ".." +enddate;

  console.log("Last month is: " + lastMonth);
  return lastMonth;
}

// comparing array of objects
function compareForSort(a,b){
  if (a.repos == b.repos)
    return 0;
  if (a.repos > b.repos)
    return -1;
  else
    return 1;
}

// returning an object that generates URL of different language for API calls
function generateGitHubURL(){
  var time = timeForApi();
  var urlObj = [];
  var url = "https://api.github.com/search/repositories?&q=+created:"+time+"+language:";

  return new Promise(function(resolve,reject){
    for (i= 0 ; i < languageName.length; i++){
      urlObj.push({
        name : languageName[i],
        url : url + languageName[i],
      });
    }
    resolve(urlObj);
  });  
}

// returning an object (ex. array) with github data and number of pages from github api 
function getData(url){
  console.log("[1]generate URL");
  var tempArray = [];

  return new Promise(function(resolve, reject){
    var options = {
      url: url,
      headers:{
        'User-Agent': 'trend_lan',
        'Accept': 'application/vnd.github.v3+json',
      }
    };

    Request(options,function(error, response,body){
      if (!error && response.statusCode == 200){
        var gitData = JSON.parse(body);
        var repositories= gitData.items;
        var language = repositories[0].language
        var reposNum = gitData.total_count;
        tempArray.push({
          name: language,
          repos: reposNum,
        })
      
        console.log("[2] getting data");
        console.log(tempArray);
        resolve(tempArray);
      }
      else if (error){
        console.error(error);
        reject(Error(error));
      }
      else {
        console.error("GETTING DATA FROM GITHUB: FAILED");
        reject(Error("GETTING DATA FROM GITHUB: FAILED"));
      }      
    });
  });
}

// saving data on the cloundant database
function saveDataToDB(array){
  console.log("this is the array on saveDataToDB:");
  console.log(array);
  Request.post({
    url: cloudant_URL,
    auth: {
      user: cloudant_KEY,
      pass: cloudant_PASSWORD
    },
    json: true,
    body: array,
    headers: {} ,
  },
  function (error, response, body){
    if (response.statusCode == 201){
      console.log("Saved!");
    }
    else{
      console.log("Uh oh...");
      console.log("Error: " + response.statusCode);
      console.log(error);
    }
  });
}


// *************************
// ROUTERS
// *************************
app.get('/', function(req, res){
  res.render('index');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/lastmonth',function(req,res){
  var time = timeForApi();
  function allDone(array){
    console.log("[4]sending back data");
    console.log(array);
    dataArray.data = array;
    dataArray.update_date = timeForApi();
    res.json(dataArray);
    // saveDataToDB(dataArray);
  }

  generateGitHubURL()
  .then(function(obj){
    var array = [];
    for (var i = 0; i < obj.length; i++){
      array[i]= obj[i].url;
    }
    console.log(array);
    return Promise.all(array.map(function(value){
      return getData(value);
    }));
  })
  .then(function(array){
    var singleArray = array[0];
    console.log("1st time");
    console.log(singleArray);

    for (var num = 1; num < (array.length); num++ ){
      var smallArray = array[num];
      for (var i = 0; i < smallArray.length; i++){
        var language= smallArray[i].name;
        var repos = smallArray[i].repos;
        singleArray.push({
          name:language,
          repos:repos,
        })
      }
    }

    console.log("2nd time");
    console.log(singleArray);
    var sumRepositories = 0;
    for (var num=0;num<singleArray.length;num++){
      sumRepositories += singleArray[num].repos;
    }
    console.log(sumRepositories);

    singleArray = singleArray.sort(compareForSort);

    console.log("3rd time");
    console.log(singleArray);

    for (var num = 0; num< singleArray.length; num++){
      singleArray[num].repos_percent = Math.round(singleArray[num].repos/sumRepositories*100);
    }

    console.log("4th time");
    console.log(singleArray);
    return Promise.resolve(singleArray);
  })
  .then(function(array){allDone(array);});
});

app.get("/api/all", function(req, res){

	Request.get({
		url: cloudant_URL+"/_all_docs?include_docs=true",
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true
	},
	function (error, response, body){
		res.json(body);
	});
});

app.get("*", function(req, res){
	res.send('Ooops.. nothing here.');
});

app.listen(port);
console.log("App is served on localhost: " + port);
