$(".speltak-mobile .row > div").on("click", function() {
  $(this).find("a")[0].click();
});
$(".speltak-open a").on("click", function() {
  $(".speltak-mobile").fadeIn("fast");
});
$(".speltak-close").on("click", function() {
  $(".speltak-mobile").fadeOut("fast");
})
