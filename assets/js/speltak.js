$(".speltak-mobile .row > div").on("click", function() {
  $(this).find("a")[0].click()
})

$(".speltak-open a").on("click", function() {

  if ($(this).parent().hasClass('type-agenda')) {

    var elems = $(document).find('.speltak-mobile > .row > div')
    for (var i = 0; i < elems.length; i++) {

      var $current = $( $(elems[i]).find('a')[0] )
      var link = $current.attr('href')
      $current.attr('href', link.replace('groep', 'programma'))
    }

  }

  $(".speltak-mobile").fadeIn("fast");

})

$(".speltak-close").on("click", function() {
  $(".speltak-mobile").fadeOut("fast")
})
