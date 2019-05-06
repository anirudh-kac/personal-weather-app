// jshint esversion :6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

const path = require('path');
const PORT = process.env.PORT || 3000;

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  var value=req.body.options;

  var option={
    url:"http://api.openweathermap.org/data/2.5/weather",
    method:"GET",
    qs:{
      q:value,
      APPID:"0db1ee1b6831cc59a0dad2f086f0f556",
    },

  };

  request(option,function(error,response,body){
  if (error){
    console.log("Error");
  }else{
    if(response.statusCode==200){

      var data=JSON.parse(body);
      //console.log(data.weather[0].main);

      var description=data.weather[0].description;
      var icon=data.weather[0].icon;
      var temp=data.main.temp -273;
      var humidity=data.main.humidity;
      var windSpeed=data.wind.speed;


//HTML elements start here
      res.write("<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.1/css/all.css' integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf' crossorigin='anonymous'>");
      res.write("<link href='styles2.css' rel='stylesheet'>");
      res.write("<h1 class='title' value="+value+">Hey Anirudh, Here's your weather data for "+value+"<h1>");
      //res.write("<img src='http://openweathermap.org/img/w/"+icon+".png' class='icon'>");
      res.write("<h1>"+description+"<h1>");
      res.write("<h1 class = 'temperature ' value="+temp+">The temperature is "+temp+"<h1>");
      res.write("<h1>The wind speed is "+windSpeed+" mph <h1>");
      res.write("<h1>The humidity is "+humidity+" % <h1>");
      res.write("<h1 class ='last '> ***<h1>");
      res.write("<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js'></script>");
      res.write(" <script src='index.js' > </script> ");

// HTML elements end here


      res.send();


    }else{
      console.log(response.statusCode);
    }
  }
});
});

app.listen(PORT,function(){
  console.log("Server running on port 3000");
});


//http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0db1ee1b6831cc59a0dad2f086f0f556

// api key 0db1ee1b6831cc59a0dad2f086f0f556
