const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


$(document).ready(() => {

  // Hide the error messages.
  $(".empty").hide();
  $(".exceeds").hide();

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
  
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();

  $("#form").submit(function(event) {
    event.preventDefault();
    console.log("the form has been submitted");
    
    let newTweet = $('#tweet-text').val();

    //Validate that the data is not empty and <= 140 characters before running POST request.
    if (newTweet.length === 0) {
      $(".empty").slideDown();
      return;
    };

    if (newTweet.length > 140) {
      $(".exceeds").slideDown();
      return;
    };
    
    // Hide the error messages. Need to put this here (again, because you have them first beneaththe document.ready up top) in order to hide an error message if a previous attempt was made which prompted an error mssage to happen.
    $(".empty").hide();
    $(".exceeds").hide();
    
    // serialize the form data (turn it into a urlencoded string to be sent to the server)
    const data = $(this).serialize();

    $.ajax({
        method: "POST",
        url: "/tweets",
        data: data
      }).then(loadTweets);
      return newTweet;
  });

});