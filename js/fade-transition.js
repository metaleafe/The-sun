//スムーススクロール
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.fade-link');

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const [path, hash] = href.split('#');

      // 内部リンクの場合（ハッシュだけの場合）
      if (path === '' && hash) {
        e.preventDefault();
        const target = document.querySelector(`#${hash}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // 💡 スムーススクロール後にアニメーション発火
          setTimeout(() => {
            triggerAnimation(`#${hash} h2`);
          }, 600); // スクロールが終わるのを少し待つ
        }
        return;
      }

      // 他ページの場合
      if (hash) {
        sessionStorage.setItem('scrollTo', `#${hash}`);
      }

      // 通常のリンク動作を停止
      e.preventDefault();
      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = path;
      }, 500);
    });
  });

  // 遷移後のスクロール処理
  const targetHash = sessionStorage.getItem('scrollTo');
  if (targetHash) {
    sessionStorage.removeItem('scrollTo');
    window.addEventListener('load', () => {
      const target = document.querySelector(targetHash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // 💡 遷移後にアニメーション発火
        setTimeout(() => {
          triggerAnimation(`${targetHash} h2`);
        }, 600);
      }
    });
  }

  // アコーディオンメニューかきます
  const items = document.querySelectorAll('.accordion-item');

  items.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach((el) => {
        if (el !== item) {
          el.classList.remove('open');
          el.querySelector('.accordion-header').classList.remove('active');
          const otherContent = el.querySelector('.accordion-content');
          otherContent.style.maxHeight = null;
          otherContent.style.paddingTop = '0';
          otherContent.style.paddingBottom = '0';
          otherContent.style.opacity = '0';
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        header.classList.remove('active');
        content.style.maxHeight = null;
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        content.style.opacity = '0';
      } else {
        item.classList.add('open');
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 40 + 'px';
        content.style.paddingTop = '10px';
        content.style.paddingBottom = '10px';
        content.style.opacity = '1';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // 1️⃣ スクロール後の処理を追加
  // ✅ ページ遷移時のスクロールターゲットを取得
  const targetHash = sessionStorage.getItem('scrollTarget');

  // ✅ セッションストレージの値を削除
  sessionStorage.removeItem('scrollTarget');

  // ✅ スクロールターゲットが存在し、現在のURLにハッシュがある場合のみ処理を実行
  if (targetHash && window.location.hash === targetHash) {
    window.addEventListener('load', () => {
      const target = document.querySelector(targetHash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // スクロール後に h2 のアニメーションを発火
        setTimeout(() => {
          triggerAnimation(`${targetHash} h2`);
        }, 600);
      }
    });
  }
});
// 2️⃣ ページ遷移前にスクロール先を保存
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      sessionStorage.setItem('scrollTarget', targetId);
    }
  });
});

// 3️⃣ アニメーション関数を定義
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

// ハンバーガーメニュー

$('.openbtn').click(function () {
  //ボタンがクリックされたら
  $(this).toggleClass('active'); //ボタン自身に activeクラスを付与し
  $('#g-nav').toggleClass('panelactive'); //ナビゲーションにpanelactiveクラスを付与
  $('.circle-bg').toggleClass('circleactive'); //丸背景にcircleactiveクラスを付与
});

$('#g-nav a').click(function () {
  //ナビゲーションのリンクがクリックされたら
  $('.openbtn').removeClass('active'); //ボタンの activeクラスを除去し
  $('#g-nav').removeClass('panelactive'); //ナビゲーションのpanelactiveクラスを除去
  $('.circle-bg').removeClass('circleactive'); //丸背景のcircleactiveクラスを除去
});

// タイムテーブルアニメーション
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.flow li').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: i * 0.1, // 順番に遅延
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
});

//スライスして横から表示
// クラスの付け外しのみ
// JS
document.addEventListener('DOMContentLoaded', () => {
  // ✅ 遷移したページのパスを取得
  const path = window.location.pathname;

  // ✅ ローディング処理があるのは index.html のみ
  if (path.includes('index.html') || path === '/') {
    console.log('🌟 Indexページのローディング開始');

    // ローディング処理
    $(window).on('load', function () {
      $('#splash').delay(3000).fadeOut('slow'); // ローディング画面を3秒待機してからフェードアウト
      $('#splash_logo').delay(3000).fadeOut('slow'); // ロゴも同様にフェードアウト

      // 💡 フェードアウトが完了した後にアニメーションを発火
      setTimeout(() => {
        console.log('🔥 ローディング終了、アニメーション開始');

        // ✅ 各文字を取得
        const chars = document.querySelectorAll('.char');

        // ✅ アニメーション処理
        chars.forEach((char, index) => {
          setTimeout(() => {
            char.classList.add('is-active');
          }, index * 100); // 100ms ごとに順番に表示
        });

        // ✅ サイトタイトル全体のアクティブ化
        const siteTitle = document.querySelector('.site-title');
        if (siteTitle) {
          siteTitle.classList.add('is-active');
        }
      }, 3800); // ローディング時間 + フェードアウト時間を合わせる
    });
  } else if (path.includes('event.html') || path.includes('faq.html')) {
    console.log('🌟 Event または FAQ ページの即アニメーション開始');

    // ✅ 各文字を取得
    const chars = document.querySelectorAll('.char');

    // ✅ アニメーション処理
    chars.forEach((char, index) => {
      setTimeout(() => {
        char.classList.add('is-active');
      }, index * 100); // 100ms ごとに順番に表示
    });

    // ✅ サイトタイトル全体のアクティブ化
    const siteTitle = document.querySelector('.site-title');
    if (siteTitle) {
      siteTitle.classList.add('is-active');
    }
  }
});


let lastScroll = 0;
const navbar = document.getElementById('g-nav');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;

  // 下方向にスクロールしている間はナビバーを隠す
  if (currentScroll > lastScroll) {
    navbar.classList.add('hide');
  } 
  // 上方向（スクロールアップ）の時はナビバーを出す
  else {
    navbar.classList.remove('hide');
  }
  lastScroll = currentScroll;
});

