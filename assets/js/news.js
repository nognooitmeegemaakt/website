var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli",
              "Augustus", "September", "Oktober", "November", "December"];
$.getJSON("/website/assets/js/news.json", function(data) {
  $.each(data, function(index, news_item) {
    var date = new Date(news_item.date);
    var month = months[ date.getMonth() ];
    var day = date.getDate();
    $(".news > .row").append('\
    <div class="news-item col-xs-10 col-sm-5 col-md-5 col-lg-4">\
      <div class="data" data-source="'+news_item.source+'"\
      data-link="'+news_item.link+'" data-type="'+news_item.type+'"\
      data-id="'+news_item.id+'" data-date="'+news_item.date+'"></div>\
      <div class="well">\
        <h5>'+day+' '+month+'</h5>\
        <div class="content">'+news_item.message+'</div>\
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
        href="https://www.facebook.com/Nog-Nooit-Meegemaakt-479823012074705/" \
        target="_blank">Ga naar Facebook</a>\
      </div>\
    </div>\
  </div>\
  ');
});

$(".news-item").on("click", function() {
  if ($(this).hasClass("see-more")) return;
  $(".news-modal").text("");
  var type = $(this).find(".data").attr("data-type");
  var content = $(this).find(".content").html();
  var source = $(this).find(".data").attr("data-source");
  var date = $(this).find(".data").attr("data-date");
  var title = $(this).find("h5");
  if (type === "photo") {
    var media = '<img src="'+source+'">';
  } else if (type === "video") {
    var media = '';
  } else {
    var media = '';
  }
  $(".news-modal").html('\
  <div class="post">\
    <h2>'+title+'</h2>\
    <p>'+content+'</p>\
    '+media+'\
    <div class="date">'+date+'</div>\
  </div>\
  ');
  $(".news-modal").show();
});
