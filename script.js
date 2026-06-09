let images = [];
let isAnimating = false;

// 起動時に画像リストを読み込む
fetch('images.json')
  .then(r => r.json())
  .then(data => { images = data.images; })
  .catch(() => {
    // フォールバック：サンプル表示
    images = ['sample_001.png', 'sample_002.png', 'sample_003.png'];
  });

function drawCard() {
  if (isAnimating || images.length === 0) return;
  isAnimating = true;

  const btn      = document.getElementById('drawBtn');
  const deck     = document.getElementById('cardDeck');
  const cardInner = document.getElementById('cardInner');
  const img      = document.getElementById('kotoba-img');
  const caption  = document.getElementById('resultCaption');

  btn.disabled = true;
  caption.classList.remove('visible');
  caption.textContent = '';

  // フリップ済みならリセット
  cardInner.classList.remove('flipped');
  cardInner.closest('.card').classList.remove('popin');
  deck.style.width  = '';
  deck.style.height = '';

  // 少し待ってからシャッフル開始
  setTimeout(() => {
    deck.classList.add('shuffling');

    // シャッフル終了後（0.5s × 3回 = 1.5s）
    setTimeout(() => {
      deck.classList.remove('shuffling');

      // ランダムに画像を選ぶ
      const picked = images[Math.floor(Math.random() * images.length)];
      img.alt = '今日のひとこと';
      img.onload = () => {
        // 画像の縦横比に合わせてカードサイズを調整
        const maxW = Math.min(window.innerWidth * 0.85, 600);
        const ratio = img.naturalHeight / img.naturalWidth;
        const w = maxW;
        const h = Math.round(maxW * ratio);
        deck.style.width  = w + 'px';
        deck.style.height = h + 'px';
      };
      img.src = 'images/' + picked;

      // カードをフリップ
      setTimeout(() => {
        cardInner.classList.add('flipped');

        // フリップ後にポンと拡大
        setTimeout(() => {
          cardInner.closest('.card').classList.add('popin');

          // キャプション表示
          setTimeout(() => {
            caption.textContent = '✿ 今日もすてきな一日を ✿';
            caption.classList.add('visible');
            btn.disabled = false;
            isAnimating = false;
          }, 400);
        }, 750);
      }, 200);
    }, 1600);
  }, 100);
}
