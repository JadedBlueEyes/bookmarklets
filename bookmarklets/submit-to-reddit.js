// ==Bookmarklet==
// @name Submit URL to Reddit
// ==/Bookmarklet==
var url = document.URL ;
var title = document.title ;

window.location.href = "https://www.reddit.com/r/"
                        + prompt("Subreddit: ", "")
                        + "/submit?title="
                        + title + "&url="
                        + url ;  
