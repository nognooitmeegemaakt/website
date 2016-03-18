var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
$.getJSON("/website/assets/js/news.json", function(data) {
  $.each(data, function(index, news_item) {
    var date = new Date(news_item.date);
    var month = months[ date.getMonth() ];
    var day = date.getDate();
    $(".news > .row").append('\
    <div class="news-item col-xs-10 col-sm-5 col-md-6 col-lg-4"\
    data-id="'+news_item.id+'" data-source="'+news_item.source+'"\
    data-type="'+news_item.type+'" data-link="'+news_item.link+'">\
      <div class="well">\
        <h5>'+day+' '+month+'</h5>\
        <div class="content">'+news_item.message+'</div>\
        <div class="image"><img src="/website/'+news_item.media+'"></div>\
      </div>\
    </div>');
  });
});

$(".news-item").on("click", function() {
  var content = $(this).find(".content").html();
  var news_id = $(this).attr("data-news-id");
});
