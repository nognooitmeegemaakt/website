---
---
/* Select a random background from the available images for matching pages. */
pageImages = {};
$.getJSON("{{ site.domain }}/assets/js/backgrounds.json", function(data, textStatus, jqxhr) {

  /* Set global variable of all page images. */
  pageImages = data;

  $.each(data, function(speltak, images) {

    if (location.href.indexOf(speltak) > -1  && images.length > 0) {

      /* Select a random background. */
      var background = images[ Math.round(Math.random() * (images.length - 1)) ];
      $("html").attr("style", "background-image: url('{{ site.domain }}/assets/img/bg/"+background+"');");
      return;
    }

  });

  /* Set default background if no background was found. */
  var bgstyle = $("html").attr("style");
  if (typeof bgstyle === typeof undefined || bgstyle === false) {
    $("html").attr("style", "background-image: url('{{ site.domain }}/assets/img/bg/main.jpg');");
  }
});
