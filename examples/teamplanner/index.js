// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var http = require("http");
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var firebase = require("firebase");
var admin = require("firebase-admin");

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

var config = {
  apiKey: "AIzaSyCEkN48w_iNNaDXuHH24CZ340XEtrg7dAI",
  authDomain: "soft352-1ff69.firebaseapp.com",
  databaseURL: "https://soft352-1ff69.firebaseio.com",
  projectId: "soft352-1ff69",
  storageBucket: "soft352-1ff69.appspot.com",
  messagingSenderId: "984599840123"
};
firebase.initializeApp(config);




console.log("connected to firebase successfully");


// Routing
app.use(express.static(path.join(__dirname, 'static')));

io.on('connection', function (socket) {

//add to socket list? - probs not needed in connection but on sign in - same with disconnecting

  socket.on('signIn', function(data){
      console.log("sign in: received email: " + data.email + " and password: " + data.password);
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function(){
          console.log("Successful sign in");
          socket.emit('signInSuccessful')
        })
        .catch(function(error) {
          console.log("Unsuccessful sign in");
          socket.emit('signInUnsuccessful')

        })
      }); //END signIn

      socket.on('signOut', function(){
        firebase.auth().signOut()
        .then(function() {
          console.log("signing out user");
          socket.emit('signOutSuccessful');
        })
      }); // END signOut

      socket.on('register', function(data){
        console.log("register: received email: " + data.email + " and password: " + data.password);
          firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
          .then(function(){
            console.log("Successful register");
            socket.emit("registerSuccessful");
          })
          .catch(function(){
            console.log("Unsuccessful register");
            socket.emit("registerUnsuccessful")

          })
        }) //END register

        socket.on('addTask', function(data){
          var taskId = 2; //NOTE temp hard coded taskID
            console.log("received task data: " + " task " + data.task + " priority " + data.priority + " weekday " + data.weekday)
    //        firebase.database().writeUserData(taskId, data.task, data.priority, data.weekday)
              firebase.database().ref('ProjectTasks/' + taskId).set({
                task: data.task ,
                priority: data.priority ,
                weekday: data.weekday
                });

        socket.emit("addTaskSuccessful");
      });//END addTask

    });  //END IO.ON
