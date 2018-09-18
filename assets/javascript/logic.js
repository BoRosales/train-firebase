var config = {
    apiKey: "AIzaSyDZF1lH324eCel2mYUKdE1tbEvQYM0eMSk",
    authDomain: "trainbase-3de5e.firebaseapp.com",
    databaseURL: "https://trainbase-3de5e.firebaseio.com",
    projectId: "trainbase-3de5e",
    storageBucket: "trainbase-3de5e.appspot.com",
    messagingSenderId: "207318257247"
  };
  firebase.initializeApp(config);

console.log("starting");

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var trainTime = 0;
var frequency = 0;
var freqTime = 0;
var date = 0;
var time = 0;

console.log("button: " + $("#add-user").attr("id"));

// Capture Button Click
$("#add-user-2").on("click", function (event) {
    event.preventDefault();
    console.log("click");

    // Grabbed values from text-boxes
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#train-time-input").val().trim();
    freqTime = $("#freq-input").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
        name: name,
        destination: destination,
        trainTime: time,
        frequency: freqTime,
    });

});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function (snapshot) {

    console.log("accessing firebase");
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().time);
    console.log(snapshot.val().freqTime);

    // Change the HTML to reflect
    $("#name").append(snapshot.val().name);
    $("#destination").append(snapshot.val().destination);
    $("#first-train").append(snapshot.val().trainTime);
    $("#frequency").append(snapshot.val().frequency);

    $("#schedule").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + trainTime + "</td><td>" + frequency + "</td></tr>");
    

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
    
});