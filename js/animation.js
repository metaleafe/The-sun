//SVGアニメーションの描画
var stroke;
stroke = new Vivus(
  'mask',
  {
    //アニメーションをするIDの指定
    start: 'manual', //自動再生をせずスタートをマニュアルに
    type: 'scenario-sync', // アニメーションのタイプを設定
    duration: 10, //アニメーションの時間設定。数字が小さくなるほど速い
    forceRender: false, //パスが更新された場合に再レンダリングさせない
    animTimingFunction: Vivus.EASE, //動きの加速減速設定
  },
  function () {
    $('#mask').attr('class', 'done'); //描画が終わったらdoneというクラスを追加
  }
);

$(window).on('load', function () {
  $('#splash').delay(3000).fadeOut('slow'); //ローディング画面を3秒（3000ms）待機してからフェイドアウト
  $('#splash_logo').delay(3000).fadeOut('slow'); //ロゴを3秒（3000ms）待機してからフェイドアウト
  stroke.play(); //SVGアニメーションの実行
});

// ドットもアニメーションで出します
gsap.utils.toArray('.dot-wrapper').forEach((wrapper) => {
  const dots = wrapper.querySelectorAll('.dot');
  gsap.fromTo(
    dots,
    {
      opacity: 0,
      y: 40,
      scale: 0.8,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
});

//ここから
// topnewsカウントダウンタイマー
const countdown = () => {
  const endTime = new Date('2025-07-05T13:00:00+09:00').getTime();
  const now = new Date().getTime();
  const timeLeft = endTime - now;

  if (timeLeft <= 0) {
    document.getElementById('countdown').innerHTML = 'イベント開催中！';
    return;
  }

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(
    2,
    '0'
  );
  document.getElementById('seconds').textContent = String(seconds).padStart(
    2,
    '0'
  );
};

setInterval(countdown, 1000);
countdown(); // 初回即実行

// Swiperを書きます
const swiperWrapper = document.querySelector('.swiper-wrapper');
const swiperContainer = document.querySelector('.swiper');
const button = document.querySelector('.btn-view-swiper');

// Swiperのインスタンス生成（初期化）
let swiperInstance;

button.addEventListener('click', (e) => {
  e.preventDefault();

  if (!swiperContainer.classList.contains('is-active')) {
    // ① 表示処理
    swiperWrapper.classList.add('is-active');
    swiperContainer.classList.add('is-active');

    // 100ms待ってからスライドを初期化
    setTimeout(() => {
      if (swiperInstance) {
        swiperInstance.destroy(true, true); // 既存のSwiperを破棄
      }

      // 再初期化
      swiperInstance = new Swiper('.swiper', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        effect: 'coverflow',
        speed: 1000,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        loop: true,
      });

      swiperInstance.update(); // 更新
      swiperInstance.slideToLoop(0, 0); // 最初のスライドにジャンプ
      swiperContainer.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // スライダーの高さを調整
    swiperContainer.style.height = 'auto';
  } else {
    // ② 非表示処理
    swiperWrapper.classList.remove('is-active');
    swiperContainer.classList.remove('is-active');

    // 高さをリセット
    swiperContainer.style.height = '0px';
  }
});

//Topページイベント
const elements = document.querySelectorAll(
  '.isolated-svg path, .isolated-svg polygon'
);
const svgElement = document.querySelector('.isolated-svg');

// 初期アニメーション設定
elements.forEach((el) => {
  gsap.set(el, {
    x: () => Math.random() * 800 - 400,
    y: () => Math.random() * 800 - 400,
    rotation: () => Math.random() * 360,
    opacity: 0,
    transformOrigin: '50% 50%', // 回転の中心を指定
  });

  gsap.to(el, {
    duration: 1,
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
    ease: 'back.out(1.7)',
    stagger: 0.01,
  });
});

// SVG のみのホバーイベントを制御
svgElement.addEventListener('mouseenter', (e) => {
  e.stopPropagation();
  gsap.to(elements, {
    duration: 0.5,
    x: () => Math.random() * 200 - 100,
    y: () => Math.random() * 200 - 100,
    rotation: () => Math.random() * 360 - 180,
    ease: 'power2.out',
    stagger: 0.005,
  });
});

svgElement.addEventListener('mouseleave', (e) => {
  e.stopPropagation();
  gsap.to(elements, {
    duration: 0.5,
    x: 0,
    y: 0,
    rotation: 0,
    ease: 'power2.out',
    stagger: 0.005,
  });
});

//ScrollTrigger.refresh()
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    // スムーススクロール
    target.scrollIntoView({ behavior: 'smooth' });

    // スクロール後に ScrollTrigger を再計算
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); // スムーススクロールの完了後
  });
});

// 💡 アニメーションを発火する関数
function triggerAnimation(selector) {
  const element = document.querySelector(selector);

  console.log(`Animating: ${selector}`, element); // デバッグ用

  if (!element) {
    console.warn(`Element not found for selector: ${selector}`);
    return;
  }

  // GSAPのアニメーション
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }
  );
}

// ページ遷移前にスクロール先を保存
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      sessionStorage.setItem('scrollTarget', targetId);
    }
  });
});
//ここまで




