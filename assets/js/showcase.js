---
---

showCaseImages = {};
$.getJSON("/assets/js/showcase.json", function(data) {

  showCaseImages = data;

  $.each(data, function(speltak, images) {

    if (location.href.indexOf(speltak) > -1  && images.length > 0) {

      /* Put all images inside a carousel if one is on the page. */
      if ($(".carousel").length) {

        if (data[speltak].length === 0) {
          $(".carousel").hide();
          return 1;
        }

        $.each(images, function(index, image) {
          if (index === 0) {
            var active = 'active';
          } else {
            var active = '';
          }
          $("ol.carousel-indicators").append('<!--//<li data-target="#carousel-example-generic" data-slide-to="'+index+'" class="'+active+'"></li>//-->')
          $("div.carousel-inner").append('<div class="item '+active+'"><img src="/assets/img/bg/'+image+'"></div>')
        });
      }

    }

  });

});
