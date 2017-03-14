
////////////////////
// Global Objects //
////////////////////

var news = {}
var likes = {}

/* Full dutch months array. */
var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli",
              "Augustus", "September", "Oktober", "November", "December"]

/* Shortened dutch months array. */
var months_short = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun",
                    "Jul", "Aug", "Sept", "Okt", "Nov", "Dec"]

//////////////////////
// Helper Functions //
//////////////////////

/**
 * Newline to html break function.
 * @param  {String}  str
 * @param  {Boolean} is_xhtml
 * @return {String}
 */
function nl2br(str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>'
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
}

/**
 * Parse the news passed by the data object
 * and add it to the news row.
 * @param  {Object} data
 * @return {Void}
 */
function parseNews (data) {

  // Empty the news row.
  $(".news > .row").text("")

  // Iterate through every news item we obtained.
  $.each(data, function(index, news_item) {

    // Pollute the global news object.
    news[news_item.id] = news_item

    // Get the correct and readable datestamps from this post.
    var arr = news_item.date.split(/[-T:+]/)
    var date = new Date(arr[0], arr[1]-1, arr[2])
    var month = months[ date.getMonth() ]
    var day = date.getDate()

    // Show no message if the message is null.
    if (news_item.message === null) {
      news_item.message = ""
    }

    // Show the appropriate media.
    if (news_item.media === null || news_item.media === false) {
      media = ""
    } else {
      media = '<img src="/../'+news_item.media+'">'
    }

    // Append a news item to the news row.
    $(".news > .row").append('\
    <div class="news-item col-xs-12 col-sm-4 col-md-4 col-lg-4">\
      <div class="data" data-source="'+news_item.source+'"\
      data-link="'+news_item.link+'" data-type="'+news_item.type+'"\
      data-id="'+news_item.id+'" data-date="'+news_item.date+'"></div>\
      <div class="well">\
        <h5 class="">'+day+' '+month+'</h5>\
        <!--//<h5 class="visible-xs">'+day+' '+months_short[date.getMonth()]+'</h5>//-->\
        <div class="content">'+nl2br(news_item.message)+'</div>\
        <div class="image">'+media+'</div>\
      </div>\
    </div>')

    // Add a clearfix after every 3rd post.
    if ((index+1) % 3 === 0) {
      $(".news > .row").append('<div class="clearfix hidden-xs-block"></div>')
    }

  })

  // After adding all news posts, we add a link to the Facebook page.
  $(".news > .row").append('\
  <div class="news-item see-more col-xs-12 col-sm-4 col-md-4 col-lg-4">\
    <div class="well">\
      <div class="content">\
        <h5>Bekijk meer op onze Facebook pagina.</h5>\
        <a class="btn btn-lg btn-primary btn-fb"\
        href="https://facebook.com/Nog-Nooit-Meegemaakt-479823012074705/" \
        target="_blank">Ga naar Facebook</a>\
      </div>\
    </div>\
  </div>\
  ')

  // We shave all news items to a predefined width of 150px.
  shave('.news-item:not(.see-more) .content', 150)
}

/**
 * Expand a news item.
 * @param  {String} post_id
 * @return {Void}
 */
function expandNewsItem(post_id) {

  // Get the current scroll position.
  // TODO

  // Scroll to top.
  window.scrollTo(0,0)

  // Get the full datestamp.
  var item = news[post_id]
  var arr = item.date.split(/[-T:+]/)
  var date = new Date(arr[0], arr[1]-1, arr[2])
  var month = months[ date.getMonth() ]
  var day = date.getDate()
  var year = date.getFullYear()

  // Display the post likes if any.
  var span_likes = ""
  var post_likes = likes[post_id]
  if (post_likes) {
    var span_likes = '<span class="likes"><!--//<i class="ion-android-favorite-outline"></i>//-->'+post_likes+' likes</span>'
  }

  // Display the correct media associated with this post.
  if (item.type == "photo") {
    var media = '<img src="'+item.source+'">'
  }
  else if (item.type == "video") {
    var media = '<video controls preload="auto"><source src="'+item.source+'">Deze browser ondersteunt geen HTML5 video.</video>'
  }
  else if (item.type == "link") {
    var media = ''
  }
  else {
    var media = ""
  }

  // Set the expanded news value.
  $(".expanded-news").html('\
  <div class="news-modal col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">\
    <div class="news-close"><i class="ion-android-arrow-back"></i> Ga Terug</div>\
    <div class="news-media">\
      '+media+'\
    </div>\
    <div class="data">\
      <div class="news-date col-xs-12 col-md-6"><span class="brand-font">'+day+' '+month+' '+year+'</span><br>'+span_likes+'</div>\
      <div class="news-fb col-xs-12 col-md-6"><a class="btn btn-primary btn-fb" target="_blank" href="https://facebook.com/'+post_id+'">Bekijk meer op Facebook</a></div>\
    </div>\
    <div class="news-text">\
      <br>\
      '+item.message+'\
    </div>\
  </div>\
  ')

  // Show the expanded news container.
  $(".expanded-news").show()
}

///////////////////
// Event Helpers //
///////////////////

/* Expand a news item or go to Facebook. */
$(".news").on("click", ".news-item", function() {

  // If this element has the .see-more class, we open the Facebook page.
  if ($(this).hasClass("see-more")) {
    window.open("https://facebook.com/Nog-Nooit-Meegemaakt-479823012074705/", "_blank")
    return
  }

  // Else, we expand the news item.
  var post_id = $(this).find(".data").attr("data-id")
  expandNewsItem(post_id)

})

/* Close expanded news on back button click. */
$(".expanded-news").on("click", ".news-close", function() {

  // Return to the previous position.
  // TODO

  // Hide the expanded news container.
  $(".expanded-news").hide()
})

/////////////////////
// Initialize News //
/////////////////////

/* Load post likes and news json. */
function init() {

  // Obtain likes of latest posts through Facebook API.
  $.getJSON("https://nognooitmeegemaakt.herokuapp.com/likes.php", function(data) {
    likes = data
  })

  // Get the latest news posts from a JSON file.
  $.getJSON("../assets/js/news.json", parseNews)

}

init()
