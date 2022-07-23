
$('div.top-img').each(function () {
    var $win = $(window),
        $winH = $win.height(),
        $connect = $(this),
        position = $connect.offset().top,
        current = 0,
        scroll;
    $win.on('load scroll', function () {
      scroll = $win.scrollTop();
      current = (0 - (position - scroll) / $winH);
      if (current > 0.9) {
        current = 1;
      }
      if (scroll > position - $winH) {
        $connect.css({opacity: 0.9999999 - current});
      }
    });
});