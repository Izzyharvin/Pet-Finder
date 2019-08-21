// Get references to page elements
var $catBtn = $("#catbutton");
var $dogBtn = $("#dogbutton");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var customerSubmit = function(type) {
 

  var newCustomer = {
    name: $("#c1")
      .val()
      .trim(),
    email: $("#c2")
      .val()
      .trim(),
    number: $("#c3")
      .val()
      .trim()
  };
  $.ajax("/api/customers", {
    type: "POST",
    data: newCustomer
  })
    .then(function() {
      console.log(type);
      console.log("Customer has been added to database...");
      window.location.href = `/${type}`
    })
    .catch(function(err) {
      console.log(err);
    });
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$dogBtn.on("click", function(event) {
  event.preventDefault();
  customerSubmit("dog");
});
$catBtn.on("click", function(event) {
  event.preventDefault();
  customerSubmit("cat");
});
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// $("#submitIt").on("click", function(event) {
//   console.log("clicked!!!!!!")
//   event.preventDefault();
  
//   var animalInfo = {
//     type: $(this).val(),
//     location: $("#q1").val(),
//     distance: $("#q2").val(),
//     gender: $("#q3").val(),
//     age: $("#q4").val(),
//     good_with_children: $("#q5").val(),
//     good_with_dogs: $("#q6").val(),
//     good_with_cats: $("#q7").val(),
//     size: $("#q8").val(),
//     coat: $("#q9").val()
//   }
//   $.post("/api/animal", animalInfo).then(function(results) {
//     console.log(results);
//   })
// });