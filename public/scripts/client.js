/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



$(document).ready(() => {

  // Hide the error messages.
  $(".empty").hide();
  $(".exceeds").hide();


  // const safeHTML = `<p>${escape(textFromUser)}</p>`;
  const createTweetElement = (input) => { const article = `
    <article class="tweet-container">
      <header>
        <div class="avatar"><img src="${input.user.avatars}">${input.user.name}</div>  
        <div class="handle">${input.user.handle}</div>
      </header>
      <div class="tweet-body">${escape(input.content.text)}</div>
      <footer>
        <div class="creation-time">${timeago.format(input.created_at)}</div>
        <div class="tweet-icons">
          <i class="fas fa-flag-checkered"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
        </div>
      </footer>
    </article>
    `
    return article;
  };


  const renderTweets = function(tweets) {
    $("#tweets-container").html("");
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let x of tweets) {
      let answer = createTweetElement(x);
      $('#tweets-container').prepend(answer);
    }   
  }
  // console.log(renderTweets(data));
  // renderTweets(data);
  // commented out the above two lines and the "data" array above once you wrote loadTweets and jquery submit buttons below.


  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();


  // $(".button-counter").submit(function(event) {
  $("#form").submit(function(event) {
    event.preventDefault();         // Stops form from submitting normally (making a GET request to the current page)
    console.log("the form has been submitted");
    
    let newTweet = $('#tweet-text').val();     // The .val() method is primarily used to get the values of form elements such as input, select and textarea. When called on an empty collection, it returns undefined.

    //Validate that the data is not empty and <= 140 characters before running POST request.
    if (newTweet.length === 0) {
      // alert("Your tweet is empty!");
      $(".empty").slideDown();
      return;
    };

    if (newTweet.length > 140) {
      // alert("Your tweet must be 140 characters or less!");
      $(".exceeds").slideDown();
      return;
    };
    
    // Hide the error messages. Need to put this here (again, because you have them first beneaththe document.ready up top) in order to hide an error message if a previous attempt was made which prompted an error mssage to happen.
    $(".empty").hide();
    $(".exceeds").hide();
    
    // serialize the form data (turn it into a urlencoded string to be sent to the server)
    // const data = $(".button-counter").serialize();
    // if you use "this", it must be a function keyword function (ie. not an arrow function)
    const data = $(this).serialize();

    $.ajax({
        method: "POST",
        url: "/tweets",
        data: data
      }).then(loadTweets);
      return newTweet;
  });




});







// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]