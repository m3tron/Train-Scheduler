var config = {
  apiKey: "AIzaSyAglDkkOG2I7XI03NOEMS8BF4vfwItSTRU",
  authDomain: "train-scheduler-27d9f.firebaseapp.com",
  databaseURL: "https://train-scheduler-27d9f.firebaseio.com",
  projectId: "train-scheduler-27d9f",
  storageBucket: "train-scheduler-27d9f.appspot.com",
  messagingSenderId: "931723817378"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function() {
  database.ref().on("child_added", function(snapshot, prevKey) {
    var data = snapshot.val();

    var tr = $("<tr>");
    tr.append($("<th class='font-weight-normal'>").text(data.trainName));
    tr.append($("<th class='font-weight-normal'>").text(data.trainDestination));
    tr.append($("<th class='font-weight-normal'>").text(data.trainFrequency));
    tr.append($("<th class='font-weight-normal'>").text(data.trainTime));

    $("tbody").append(tr);
  });

  $("#submit").on("click", function(e) {
    e.preventDefault();
    var name = $("#trainName")
      .val()
      .trim();
    var destination = $("#trainDestination")
      .val()
      .trim();
    var time = $("#trainTime")
      .val()
      .trim();
    var frequency = $("#trainFrequency")
      .val()
      .trim();
    console.log(name, destination, time, frequency);

    database.ref().push({
      trainName: name,
      trainDestination: destination,
      trainTime: time,
      trainFrequency: frequency
    });
  });
});
