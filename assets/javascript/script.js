$(document).ready(function () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAkBpVFYyWDdcG2PbcsJXVA0mGC1qn2KYo",
    authDomain: "booming-monitor-252720.firebaseapp.com",
    databaseURL: "https://booming-monitor-252720.firebaseio.com",
    projectId: "booming-monitor-252720",
    storageBucket: "",
    messagingSenderId: "718629106456",
    appId: "1:718629106456:web:9e5f5631f940c3e86ca46d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  var database = firebase.database();



  // values

  var trainName = "";
  var destination = "";
  var frequency = 0;
  // var firstTrainTime = "";
  var minutesAway = "";
  var trainArrival = "";
  var path = "train-scheduler";







  $("#addTrain").on("click", function (event) {
    event.preventDefault();




    trainName = $("#trainName").val();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();

    console.log(firstTrainTime)

    // momentJS();


    var tFrequency = frequency;

    console.log(tFrequency)


    // Time is 3:30 AM
    // var firstTime = "03:00";

    var firstTime = firstTrainTime;

    console.log(firstTime)

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    console.log(firstTimeConverted); 222

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);




    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var trainArrival = moment(nextTrain).format("hh:mm");


    // database.ref().push({ 
    //   trainArrival: trainArrival

    // })

    console.log(trainArrival);






    database.ref(path).push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      trainArrival: trainArrival,
      firstTrainTime: firstTrainTime,
      tMinutesTillTrain: tMinutesTillTrain,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });






  });

  // function addDatabaseInfo () {


  database.ref(path).on("child_added", function (childSnapshot) {

    // 
    


    var childSnapshotVal = childSnapshot.val();


    $("#tableBody").append("<tr><td> " + childSnapshotVal.trainName +
      " </td><td class='destination'> " + childSnapshotVal.destination +
      " </td><td class='frequency'> " + childSnapshotVal.frequency +
      " </td><td class='trainArrival'> " + childSnapshotVal.trainArrival +
      " </td><td class='tMinutesTillTrain'> " + childSnapshotVal.tMinutesTillTrain +
      " </td></tr>");


  })




  database.ref(path).orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

    var sv = snapshot.val();

    // console.log(sv.name);
    //    console.log(sv.destination);
    //    console.log(sv.frequency);
    //    console.log(sv.firstTrainTime);


    $("#trainName").text(snapshot.val().trainName);
    $("#destination").text(snapshot.val().destination)
    $("#frequency").text(snapshot.val().frequency)
    $("#firstTrainTime").text(snapshot.val().firstTrainTime)


  });

});
