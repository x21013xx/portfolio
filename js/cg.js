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
        $connect.css({opacity: 0.89 - current});
      }
    });
});

function TextAnimeControl() {
  $('.Trigger').each(function(){ 
  var elemPos = $(this).offset().top-50;
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();
  if (scroll >= elemPos - windowHeight){
  $(this).addClass('app');// 画面内に入ったらblurというクラス名を追記
  }else{
  $(this).removeClass('app');// 画面外に出たらblurというクラス名を外す
  }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  TextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述