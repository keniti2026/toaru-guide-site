// とあるシリーズ総合ガイド - script.js
// 最低限のインタラクション: モバイルナビ開閉 / キャラクタータブ切り替え / カードのタップ詳細

document.addEventListener('DOMContentLoaded', () => {

  /* ---- モバイルナビ開閉 ---- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- キャラクタータブ切り替え（禁書目録 / 超電磁砲 / 一方通行） ---- */
  const charTabs = document.querySelectorAll('.char-tab');
  const charPanels = document.querySelectorAll('.char-panel');

  charTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      charTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      charPanels.forEach((panel) => {
        if (panel.id === `panel-${targetId}`) {
          panel.hidden = false;
          panel.classList.add('active');
        } else {
          panel.hidden = true;
          panel.classList.remove('active');
          // 非表示パネルのカードは裏返しをリセット
          panel.querySelectorAll('.char-card.flipped').forEach((c) => c.classList.remove('flipped'));
        }
      });
    });
  });

  /* ---- キャラクターカード：タップで詳細フリップ ---- */
  const charCards = document.querySelectorAll('.char-card');
  charCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
    // キーボード操作対応
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  /* ---- 裏面のリンクをクリックしてもカードが裏返らないようにする ---- */
  document.querySelectorAll('.char-back a, .char-official-link, .anime-official').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

});
