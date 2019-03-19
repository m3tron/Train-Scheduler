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

    //minutes remaining to next train
    var minutesAway =
      data.trainFrequency -
      (moment().diff(moment.unix(data.firstTrainTime), "minutes") %
        data.trainFrequency);

    //arrival time of next train
    var nextArrival = moment()
      .add(minutesAway, "m")
      .format("hh:mm A");

    //displays information from database to train schedule
    var tr = $("<tr>");
    tr.append(
      $("<th class='font-weight-normal text-capitalize'>").text(data.trainName)
    );
    tr.append(
      $("<th class='font-weight-normal text-capitalize'>").text(
        data.trainDestination
      )
    );
    tr.append($("<th class='font-weight-normal'>").text(data.trainFrequency));
    tr.append($("<th class='font-weight-normal'>").text(nextArrival));
    tr.append($("<th class='font-weight-normal'>").text(minutesAway));
    $("tbody").append(tr);
  });

  $("#submit").on("click", function(e) {
    e.preventDefault();

    //stores data from input into variables
    var name = $("#trainName")
      .val()
      .trim();
    var destination = $("#trainDestination")
      .val()
      .trim();
    var time = moment(
      $("#trainTime")
        .val()
        .trim(),
      "HH:mm"
    ).format("X");
    var frequency = $("#trainFrequency")
      .val()
      .trim();

    //pushes data to database
    database.ref().push({
      trainName: name,
      trainDestination: destination,
      firstTrainTime: time,
      trainFrequency: frequency
    });
  });
});
