const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const path = require('path');

const app = express();//initializing express

const publicVapidKey = 'BNpHtspplq1APafUU7To6NkGH0E7LqBIuB4dEhtEcgONaRdfX1bSND17KlDm-gc5nYi5PUOe9AaOKntZYXbm7kM';
const privateVapidKey = '1mRVV0mcF629MEvv6lFwb5L-fO9CuPGmaAZcoU8w7v0';

app.use(express.static(__dirname));
app.use(bodyParser.json())

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.get('/subscribe',function(req, res){ //get request to a route,callback fn
    res.sendFile(__dirname + '/subscribe.html'); //sending file as respond on req
});

app.post('/subscribe', function(req, res){
    const subscription = req.body;
    //send 201 - resource created
    res.status(201).json({});
    //create payload
    const payload = JSON.stringify({title: 'Push Test'});
    //Pass object to sendNotification
    webpush.sendNotification(subscription,payload).catch(err => console.error(err));
});

app.get('/',function(req, res){ //get request to a route,callback fn
    res.sendFile(__dirname + '/home.html'); //sending file as respond on req
});

app.get('/home',function(req, res){
    res.sendFile(__dirname + '/home.html');
});

app.get('/about',function(req, res){ //get request to a route,callback fn
    res.sendFile(__dirname + '/about.html'); //sending file as respond on req
});

app.listen(3000);//listening to port 3000
console.log('Listening to port 3000..');