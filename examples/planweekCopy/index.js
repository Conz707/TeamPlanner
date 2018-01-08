var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var routes = require("./routes.js");
var port = 5000;

app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});


app.use("/assets", express.static("./assets")); //find files in assets
app.set("view engine", "ejs"); //convert html to ejs

routes(app);

console.log("server running on port #" + port);

io.on('connection', function (socket) {

  socket.on('signIn',function(data){
      console.log(data.email + " " + data.password);
    });
});

http.listen(port, function(){
    console.log('listening on :' + port);
});

/*  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(){
    window.location.href="./landingPage";
  })

  .catch(function(error) {
    alert("Incorrect email or password. Please try again.");
  })
}*/
