const fs = require('fs');
const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
    // res.send("This is just the beginning")
})
app.post("/", (req, res) => {
    const lat = "39.5067218";
    const lon = "-84.7316617";
    const city = req.body.cityName;
    const apikey = "9776152f9ee2e8c3262a33cc9386ce11";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
    https.get(url, (response) => {
        console.log(res.statusCode);
    
        response.on('data', (d) => {
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write(`<h1>The temperature in ${city} is ${temp} degrees Celsius</h1>`);
            res.write("<p>The weather report tell us its " + weatherDescription + "</p>");
            res.write("<h1>I was sure it would snow today >.< </h1>")
            
            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<img src='${imgURL}'>`);
            res.send();
        })
    })
})
app.listen(port, (req, res) => {
    console.log("Listening")
})