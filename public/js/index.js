// Get references to page elements
var $catBtn = $("#catbutton");
var $dogBtn = $("#dogbutton");
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
// Add event listeners to the submit and delete buttons
$dogBtn.on("click", function(event) {
  event.preventDefault();
  customerSubmit("dog");
});
$catBtn.on("click", function(event) {
  event.preventDefault();
  customerSubmit("cat");
});

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