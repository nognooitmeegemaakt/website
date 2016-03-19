var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli",
              "Augustus", "September", "Oktober", "November", "December"];
var months_short = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun",
                    "Jul", "Aug", "Sept", "Okt", "Nov", "Dec"];
function nl2br(str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
$.getJSON("/website/assets/js/news.json", function(data) {
  $.each(data, function(index, news_item) {
    var arr = news_item.date.split(/[-T:+]/);
    var date = new Date(arr[0], arr[1]-1, arr[2]);
    var month = months[ date.getMonth() ];
    var day = date.getDate();
    $(".news > .row").append('\
    <div class="news-item col-xs-10 col-sm-5 col-md-5 col-lg-4">\
      <div class="data" data-source="'+news_item.source+'"\
      data-link="'+news_item.link+'" data-type="'+news_item.type+'"\
      data-id="'+news_item.id+'" data-date="'+news_item.date+'"></div>\
      <div class="well">\
        <h5 class="hidden-xs">'+day+' '+month+'</h5>\
        <h5 class="display-xs">'+day+' '+months_short[date.getMonth()]+'</h5>\
        <div class="content">'+nl2br(news_item.message)+'</div>\
        <div class="image"><img src="/website/'+news_item.media+'"></div>\
      </div>\
    </div>');
  });
  $(".news > .row").append('\
  <div class="news-item see-more col-xs-10 col-sm-5 col-md-5 col-lg-4">\
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

$(".news").on("click", ".news-item", function() {
  if ($(this).hasClass("see-more")) {
    window.open("https://facebook.com/Nog-Nooit-Meegemaakt-479823012074705/", "_blank");
    return;
  }
  window.open("https://facebook.com/"+$(this).find(".data").attr("data-id"), "_blank");
});
