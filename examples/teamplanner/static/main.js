var socket = io();

$( "#signInBtn" ).click(function() {
  var $user = $("#userTxt").val();
  var $password = $('#passwordTxt').val();
  var userDetailsPackage = {    //try and capture this outside of the buttons
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

$( "#addTaskBtn" ).click(function() {
var $task = $("#taskTxt").val();
var $priority = $("#priority option:selected").text();
var $weekday = $("#weekday option:selected").text();
var createTaskPackage = {    //try and capture this outside of the buttons
  task: $task,
  priority: $priority,
  weekday: $weekday,
}
console.log($task);
console.log($priority);
console.log($weekday);
socket.emit('addTask', createTaskPackage);
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

socket.on('addTaskSuccessful', function(){
          alert("Task added successfully!");
});
