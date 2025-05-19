gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.event-photo-img').forEach((img) => {
  gsap.to(img, {
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: img,
      start: 'top bottom',
      end: 'top center',
      scrub: true,
    },
  });
});

// h2見だし
/* spanタグに分割 */
let splitTarget = document.querySelectorAll('.js-splitText'); //ターゲットとなる要素を全取得
splitTarget.forEach((target) => {
  // target = ターゲット
  if (!target.classList.contains('is-active')) {
    //ターゲットが'is-active'クラスを持っていない場合
    newText = ''; //生成する要素を格納するための変数
    spanText = target.innerHTML; //ターゲットの中身を取得
    spanText.split('').forEach((char) => {
      // char = character 文字
      newText += '<span>' + char + '</span>'; //一文字ずつspanタグで囲む
    });
    target.innerHTML = newText; //ターゲットに生成した要素を挿入
  }
});

let textEffect = document.querySelectorAll('.js-text-effect'); //ターゲットとなる要素を全取得
textEffect.forEach((target) => {
  let spans = target.querySelectorAll('span');
  gsap.to(spans, {
    duration: 0.5,
    autoAlpha: 1,
    rotateY: '0deg',
    stagger: {
      each: 0.1,
    },
    scrollTrigger: {
      trigger: target,
      start: 'bottom bottom',
    },
  });
});

// アニメーション設定
var titleTimeline = new TimelineMax({
  repeat: -1,
  repeatDelay: 0.5,
  yoyo: true,
});

titleTimeline.staggerTo(
  '.animated-title span',
  0.8,
  {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    ease: Power3.easeOut,
  },
  0.05
);

// ページ遷移しますよ
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.fade-link');

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      // #から始まるページ内リンクや、target="_blank"は除外
      if (!href || href.startsWith('#') || link.target === '_blank') return;
      // ※current pageは除外してもいい

      e.preventDefault();

      // bodyに.routingクラスを付与 → 黒丸拡大
      document.body.classList.add('routing');

      // splashbgのアニメ終了時にページ遷移
      const splashbg = document.querySelector('.splashbg');
      // 一度だけ実行するための関数
      function onAnimationEnd() {
        splashbg.removeEventListener('transitionend', onAnimationEnd);
        window.location.href = href;
      }
      splashbg.addEventListener('transitionend', onAnimationEnd);

      // もしブラウザによってtransitionendが発火しない場合の保険としてタイマーも入れる
      setTimeout(() => {
        window.location.href = href;
      }, 1000); // transitionよりちょっと長め
    });
  });
});
