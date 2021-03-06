var socket = io();

$( "#signInBtn" ).click(function() {
  var $user = $("#userTxt").val();
  var $password = $('#passwordTxt').val();
  var userDetailsPackage = {    
    user: $user,
    password: $password,
  }
  console.log($user);
  console.log($password);
  socket.emit('signIn', userDetailsPackage);
});


$( "#signOutBtn" ).click(function() {
socket.emit('signOut');
console.log("sign out clicked");
});


$( "#registerBtn" ).click(function() {
var $user = $("#userTxt").val();
var $password = $('#passwordTxt').val();
var userDetailsPackage = {    //try and capture this outside of the buttons
  user: $user,
  password: $password,
}
console.log($user);
console.log($password);
socket.emit('register', userDetailsPackage);
console.log("emitted register");
});

$( "#refreshEvents" ).click(function() {
socket.emit("refreshEvents");
});

$( "#addEventBtn" ).click(function() {
var $event = $("#eventTxt").val();
var $priority = $("#priority option:selected").text();
var $date = $("#datePicker").val();


if ($event == "" || $priority == "" || $date == "") {
  alert("Please ensure all event fields filled in.");
} else if(confirm('Are you sure you would like to add this event?')) {
var createEventPackage = {    //try and capture this outside of the buttons
  event: $event,
  priority: $priority,
  date: $date,
}
console.log($event);
console.log($priority);
console.log($date);
socket.emit('addEvent', createEventPackage);
}
});


socket.on('signInSuccessful', function(){
  console.log("successful sign in");
  window.location.href="landingPage.html";
});

socket.on('signInUnsuccessful', function(){
console.log("unsuccessful sign in");
alert("Incorrect user or password. Please try again.");
});


socket.on('signOutSuccessful', function(){
  alert("signed out - returning to login page");
  window.location.href ='index.html';
  console.log("sign out successful")
});

socket.on('registerSuccessful', function(){
          alert("Account Registered Successfully - Signing in");
          window.location.href="landingPage.html"
});

socket.on('registerUnsuccessful', function(){
          alert("Username in use - Please try another");
});

socket.on('addEventSuccessful', function(){
          alert("Event added successfully!");
});

socket.on('displayLowPriorityEvents', function(result){
  document.getElementById('lowPriorityEvents').innerHTML = "<h2>Low Priority</h2>";
  result.forEach(function (result){
    if (document.getElementById('lowPriorityEvents').innerHTML != null){
      document.getElementById('lowPriorityEvents').innerHTML += "<div class='boxed'><h2>" + result.Event + "</h2><h3>" + result.Date + "</h3></div>"
      }
   })
});

socket.on('displayMediumPriorityEvents', function(result){
  document.getElementById('mediumPriorityEvents').innerHTML = "<h2>Medium Priority</h2>";
  result.forEach(function (result){
    if (document.getElementById('mediumPriorityEvents').innerHTML != null){
      document.getElementById('mediumPriorityEvents').innerHTML += "<div class='boxed'><h2>" + result.Event + "</h2><h3>" + result.Date + "</h3></div>"
      }
   })
});

socket.on('displayHighPriorityEvents', function(result){
  document.getElementById('highPriorityEvents').innerHTML = "<h2>High Priority</h2>";
  result.forEach(function (result){
    if (document.getElementById('highPriorityEvents').innerHTML != null){
      document.getElementById('highPriorityEvents').innerHTML += "<div class='boxed'><h2>" + result.Event + "</h2><h3>" + result.Date + "</h3></div>"
      }
   })
});

function startRefreshingEvents(){   //need to start refreshing div once page has finished loading
    socket.emit('refreshEvents');
}
