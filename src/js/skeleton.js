$(document).ready(function () {
  $('img.lazy-load').each(function () {
    $(this)
      .on('load', function () {
        $(this).prev('.skeleton').fadeOut();
        $(this).fadeIn();
      })
      .each(function () {
        if (this.complete) $(this).trigger('load');
      });
  });
});
