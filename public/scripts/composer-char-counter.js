$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {
    
    let value = $(this).val().length;
    let counter = 140 - value;
    console.log(counter); 

    $(this).next("div").children("output").text(counter);

    if (counter < 0) {
      $(".counter").css('color', '#da2809');   // referring to class "counter" on line 70 of index.html, not our variable declared on line 21.
    }
  })  
  
});

