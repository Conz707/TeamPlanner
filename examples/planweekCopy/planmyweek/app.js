var express = require('express');
var app = express();
var path = require('path');
var port = 5000;
var server = require('http').createServer(app);
var io = require('socket.io')(server)
var routes = require("./routes.js");


app.use("/assets", express.static("./assets")); //find files in assets
app.set("view engine", "ejs"); //convert html to ejs
app.listen(port);

routes(app);

console.log("server running on port #" + port);

io.sockets.on('connection', function (socket) {

  socket.on('signIn',function(data){
      console.log(data.email + " " + data.password);
    });
});



/*  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(){
    window.location.href="./landingPage";
  })

  .catch(function(error) {
    alert("Incorrect email or password. Please try again.");
  })
}*/
