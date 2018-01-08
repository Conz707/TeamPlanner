var socket = io();

$( "#signInBtn" ).click(function() {
  var $email = $("#emailTxt").val();
  var $password = $('#passwordTxt').val();
  var userDetailsPackage = {    //try and capture this outside of the buttons
    email: $email,
    password: $password,
  }
  console.log($email);
  console.log($password);
  socket.emit('signIn', userDetailsPackage);
});


$( "#signOutBtn" ).click(function() {
socket.emit('signOut');
});


$( "#registerBtn" ).click(function() {
var $email = $("#emailTxt").val();
var $password = $('#passwordTxt').val();
var userDetailsPackage = {    //try and capture this outside of the buttons
  email: $email,
  password: $password,
}
console.log($email);
console.log($password);
socket.emit('register', userDetailsPackage);
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
alert("Incorrect email or password. Please try again.");
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
          alert("Ensure email in correct format, unused and password is at least 6 characters");
});

socket.on('addTaskSuccessful', function(){
          alert("Task added successfully!");
});
