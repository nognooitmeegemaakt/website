/* Full dutch months array. */
var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli",
              "Augustus", "September", "Oktober", "November", "December"];

/* Shortened dutch months array. */
var months_short = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun",
                    "Jul", "Aug", "Sept", "Okt", "Nov", "Dec"];

/* Newline to html break function. */
function nl2br(str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

/* Detect if device is a touch device. */
function is_touch_device() {
  // https://stackoverflow.com/a/4819886
  return 'ontouchstart' in window  // works on most browsers
      || navigator.maxTouchPoints; // works on IE10/11 and Surface
}

/* Initialize news function. */
var news = {};
var likes = {};
function initNews() {

  $.getJSON("https://nognooitmeegemaakt.herokuapp.com/likes.php", function(data) {
    likes = data;
  });

  $.getJSON("../assets/js/news.json", function(data) {
    $(".news > .row").text("");
    $.each(data, function(index, news_item) {
      news[news_item.id] = news_item;
      var arr = news_item.date.split(/[-T:+]/);
      var date = new Date(arr[0], arr[1]-1, arr[2]);
      var month = months[ date.getMonth() ];
      var day = date.getDate();
      if (news_item.message === null) {
        news_item.message = "";
      }
      if (news_item.media === null) {
        media = "";
      } else {
        media = '<img src="/../'+news_item.media+'">';
      }
      $(".news > .row").append('\
      <div class="news-item col-xs-6 col-sm-4 col-md-4 col-lg-4">\
        <div class="data" data-source="'+news_item.source+'"\
        data-link="'+news_item.link+'" data-type="'+news_item.type+'"\
        data-id="'+news_item.id+'" data-date="'+news_item.date+'"></div>\
        <div class="well">\
          <h5 class="">'+day+' '+month+'</h5>\
          <!--//<h5 class="visible-xs">'+day+' '+months_short[date.getMonth()]+'</h5>//-->\
          <div class="content">'+nl2br(news_item.message)+'</div>\
          <div class="image">'+media+'</div>\
        </div>\
      </div>');
    });
    $(".news > .row").append('\
    <div class="news-item see-more col-xs-6 col-sm-4 col-md-4 col-lg-4">\
      <div class="well">\
        <div class="content">\
          <h5>Bekijk meer op onze Facebook pagina.</h5>\
          <a class="btn btn-lg btn-primary btn-fb"\
          href="https://facebook.com/Nog-Nooit-Meegemaakt-479823012074705/" \
          target="_blank">Ga naar Facebook</a>\
        </div>\
      </div>\
    </div>\
    ');
  });
}

/* Initialize the news. */
initNews();

/* Open tab to Facebook on click of newsitem for now. */
$(".news").on("click", ".news-item", function() {
  if ($(this).hasClass("see-more")) {
    window.open("https://facebook.com/Nog-Nooit-Meegemaakt-479823012074705/", "_blank");
    return;
  }

  var post_id = $(this).find(".data").attr("data-id");
  expandNewsItem(post_id);
});

function expandNewsItem(post_id) {
  var item = news[post_id];
  var arr = item.date.split(/[-T:+]/);
  var date = new Date(arr[0], arr[1]-1, arr[2]);
  var month = months[ date.getMonth() ];
  var day = date.getDate();
  var year = date.getFullYear();
  var span_likes = "";
  var post_likes = likes[post_id];
  if (post_likes) {
    var span_likes = '<span class="likes"><!--//<i class="ion-android-favorite-outline"></i>//-->'+post_likes+' likes</span>';
  }

  if (item.type == "photo") {
    var media = '<img src="'+item.source+'">';
  }
  else if (item.type == "video") {
    var media = '<video controls preload="auto"><source src="'+item.source+'">Deze browser ondersteunt geen HTML5 video.</video>';
  }
  else if (item.type == "link") {
    var media = '';
  }
  else {
    var media = "";
  }
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
  ');
  $(".expanded-news").show();
}

/* Close expanded news on back button click. */
$(".expanded-news").on("click", ".news-close", function() {
  $(".expanded-news").hide();
});

/* Apply special scrollbar only to desktops without touch. */
if (!is_touch_device()) {
  $("head").append('\
  <style>\
    ::-webkit-scrollbar {\
      width: 12px;\
      background-color: #222;\
    }\
    ::-webkit-scrollbar-thumb {\
      background-color: #ff8b00;\
    }\
  </style>\
  ');
}

/* Horizontal scrolling for desktop. */
$.getScript("/../assets/js/jquery.mousewheel.min.js", function() {
  $(".news > .row").mousewheel(function(event, delta) {
    if (!is_touch_device() && !(navigator.platform.toUpperCase().indexOf('MAC')>=0)) {
      this.scrollLeft -= (delta * 30);
      event.preventDefault();
    }
  });
});
