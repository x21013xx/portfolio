//main画像
const mynameimg = document.getElementById("myname");
document.getElementById("sc-to-left").addEventListener('click', clickleft);
document.getElementById("sc-to-right").addEventListener('click', clickright);

let idx = 1;

function clickright (){
  idx++;
  if (idx > 3) {
    idx = 1;
  }

  mynameimg.style.backgroundImage = "url('./image/image"+ idx +".jpg')";
  mynameimg.style.animation = "fadeIn"+ idx +" 2s ease 0s 1 normal";
  mynameimg.style.WebkitAnimation = "fadeIn"+ idx +" 2s ease 0s 1 normal";
}

function clickleft (){
    idx--;
    if (idx < 1) {
      idx = 3;
    }
  
    mynameimg.style.backgroundImage = "url('./image/image"+ idx +".jpg')";
    mynameimg.style.animation = "fadeIn"+ idx +" 2s ease 0s 1 normal";
    mynameimg.style.WebkitAnimation = "fadeIn"+ idx +" 2s ease 0s 1 normal";
}

setInterval('clickright()',10000);

//SVGアニメーションの描画
var stroke;
stroke = new Vivus('mask', {
    start:'manual',
    type: 'scenario-sync',
    duration: 90,
    forceRender: false,
    animTimingFunction:Vivus.EASE,
});
 
stroke.play();

//スライドショー
let sliderTime;

sliderTime = $('.slider').slick({
            autoplay: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            prevArrow: '<div class="slick-prev"></div>',
            nextArrow: '<div class="slick-next"></div>',
            dots: true,
});

setInterval('sliderTime', 2500);

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