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
var mysql = require('mysql')

var con = mysql.createConnection({
database: "teamplanner",
host: "localhost",
user: "root",
dateStrings: 'date'
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Routing
app.use(express.static(path.join(__dirname, 'static')));

io.on('connection', function (socket) {

  socket.on('signIn', function(data){
    //i spent an hour trying to fix this and found out my table was "users" not "user" :)
    var checkUserAndPassQuery = con.query("SELECT COUNT (*) AS count From users WHERE user= '"+ data.user +"' && password = '"+ data.password +"'", function (error, result){
      const count = result[0].count;
      if(error) throw error;
        if (count != 0){   //if row count is 0 then a username and password is not found in the database
        console.log("Logging user in");
        socket.emit('signInSuccessful');
          } else {
          console.log("Sign in Unsuccessful");
          socket.emit('signInUnsuccessful');
        }



    });


  }); //END signIn

        socket.on('signOut', function(){
            console.log("signing out user");
            socket.emit('signOutSuccessful');
        }); // END signOut

      	socket.on("register", function(data){
          console.log("received emit")
          var userExistsQuery = con.query("SELECT COUNT (*) AS count FROM users WHERE user=?", data.user, function(error, result) {
      			if(error) throw error;
            const count = result[0].count;
              if (count > 0){   //if row count is more than 0 then a user with the user must exist
              console.log("user already exists",error);
              socket.emit('registerUnsuccessful');
            		} else {
                console.log("User created");
      					socket.emit('registerSuccessful');
      					var userRegistrationPackage = {user:data.user, password:data.password};
      					var registerUserQuery = con.query('INSERT INTO users SET?',userRegistrationPackage, function(err, result){
      				});
      			}
      		});
          console.log("trying to return register emit");
      	});     //END register


        socket.on('addEvent', function(data){
        var addEventPackage = {
                Event: data.event ,
                priority: data.priority ,
                date: data.date
                };
                var addEventQuery = con.query("INSERT INTO events SET?", addEventPackage, function(error, result) {
                  if(error) throw error;
                    });
                      socket.emit("addEventSuccessful");
                  });//END addEvent

                  socket.on('refreshEvents', function(){
                    setInterval(function(){
                    var addEventQuery = con.query("SELECT Event, Priority, Date FROM events", function(error, result) {
                    if(error) throw error;
                    console.log("firing back")
                      socket.emit("displayEvents", result);
                    })
                  }, 1000/60);
                }); //END refreshEvents


    });  //END IO.ON
