---
---
/* Select a random background from the available images for matching pages. */
$.getJSON("{{ site.domain }}/assets/js/backgrounds.json", function(data, textStatus, jqxhr) {
  $.each(data, function(speltak, images) {
    if (location.href.indexOf(speltak) > -1  && images.length > 0) {
      var image = images[ Math.round(Math.random() * (images.length - 1)) ];
      $("html").attr("style", "background-image: url('{{ site.domain }}/assets/img/bg/"+image+"');");
      return;
    }
  });
  var bgstyle = $("html").attr("style");
  if (typeof bgstyle === typeof undefined || bgstyle === false) {
    $("html").attr("style", "background-image: url('{{ site.domain }}/assets/img/bg/main.jpg');");
  }
});
