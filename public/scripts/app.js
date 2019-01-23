/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweetData = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": {
//           "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//           "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//           "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//         },
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": {
//           "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//           "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//           "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//         },
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     },
//     {
//       "user": {
//         "name": "Johann von Goethe",
//         "avatars": {
//           "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//           "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//           "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//         },
//         "handle": "@johann49"
//       },
//       "content": {
//         "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//       },
//       "created_at": 1461113796368
//     }
//   ];

function createTweetElement(tweet){
    // let myObj = $.parseJSON(tweet.created_at),
    let myDate = new Date(1000 * tweet.created_at);
    
    let $tweet = `
        <article class = 'tweet'>
            <header><img class = 'profilePic' src = "${tweet.user.avatars.small}"><p class = 'username'>${tweet.user.name}</p><p class = 'handle'>${tweet.user.handle}</p></header>
            <p class = 'tweetText'>${tweet.content.text}</p>
            <footer> <p class = 'dateCreated'>${myDate.toUTCString()}</p><img class = 'icon' src = '/images/flag.png'><img class = 'icon' src = '/images/repeat.png'><img class = 'icon' src = '/images/heart.png'></footer>
        </article>
    `
    
    return $tweet;
}

function renderTweets(tweets){
  if($('.tweet').val() === undefined){
    $('#tweetContainer').empty();
    tweets.forEach(currTweet => {
          $('#tweetContainer').prepend(createTweetElement(currTweet));
      });
  }else{
    let lastTweet = tweets[tweets.length - 1];
    
    $('#tweetContainer').prepend(createTweetElement(lastTweet));
  }
}

const submitTweet = () => {
  $('form').on('submit', function(event){
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize()
    })
      .done(function(msg){
        loadTweets();
        $('textArea').val('');
        $('.counter').text(140);
      });
  });
}

const loadTweets  = () => {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  })
    .done(function(data){
      renderTweets(data);
    });
}

$(document).ready(function(){
    loadTweets();
    submitTweet();
})