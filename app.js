const express = require("express");
const https = require("https");
const { domainToUnicode } = require("url");
const bodyParser = require("body-parser");


const app = express();

// Necessary code for bodyParser
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
});



app.listen(3000, function(){
    console.log("server is running in port 3000");

});


app.post("/", function(req, res){
    console.log(req.body.city);
    console.log("post Recive");

    //Without using HTML this is the code for weather app 
const quary = req.body.city;
const appkey = "8e31ca02669b50350f53da3e3e5377f2";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+quary+"&appid=" + appkey + "&units="+unit;

https.get(url, function(respons){
    console.log(respons.statusCode);
    respons.on("data",function(data){
        console.log(data);

        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        console.log(weatherData.main.temp);
        const weatherDes = weatherData.weather[0].description;
        console.log(weatherDes);

        const icon = weatherData.weather[0].icon;
        imgURL = " http://openweathermap.org/img/wn/" + icon+"@2x.png";

        res.write("<h1>The teperature in "+quary+" is "+ temp + "degrees Celcius.</h1>");
        res.write("<p>The weather is"  + weatherDes+"</p>");
        res.write("<img src= "+imgURL+">");
        

        res.send();
    });
});







});











