

$(".news-item").on("click", function() {
  var content = $(this).find(".content").html();
  var news_id = $(this).attr("data-news-id");
});
