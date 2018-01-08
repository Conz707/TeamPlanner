var socket = io.connect();


var $signInBtn = $('#signInBtn');
var emailVar = $('emailTxt');
var passwordVar = $('passwordTxt');

var signInPackage = {
  email: emailVar,
  password: passwordVar,
}

$signInBtn.click(function(){
  socket.emit('signIn', signInPackage);
});

function firebaseSignIn(){

  var email = document.getElementById('emailTxt').value;
  var password = document.getElementById('passwordTxt').value;

    console.log(email + password);
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(){
    window.location.href="./landingPage";
  })

  .catch(function(error) {
    alert("Incorrect email or password. Please try again.");
  });
}

function firebaseSignOut(){
  firebase.auth().signOut()
  .then(function() {
    window.location.href="./";
  })
}

function firebaseRegister(){
  var email = document.getElementById('emailTxt').value;
  var password = document.getElementById('passwordTxt').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      alert("Account Registered Successfully - Signing in")
      window.location.href="./landingPage";
    })
    .catch(function(){
      alert("Ensure email in correct format and password at least 6 characters");
    })
  }




function createTask(){
  var task = document.getElementById('taskTxt').value;
  var p = document.getElementById('priority');
  var priorityText = p.options[p.selectedIndex].text;
  var w = document.getElementById('weekday');
  var weekdayText = w.options[w.selectedIndex].text;
  console.log("task " + task + " priority " + priorityText + " weekday " + weekdayText);
}
