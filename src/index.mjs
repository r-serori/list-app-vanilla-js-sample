// いいね数をlocalStorageに保存・取得する関数
function getLikesFromStorage(postId) {
  const likes = localStorage.getItem(`likes_post_${postId}`);
  return likes ? parseInt(likes) : 0; // データがなければ0を返す
}

function saveLikesToStorage(postId, likeCount) {
  localStorage.setItem(`likes_post_${postId}`, likeCount);
}

// 投稿のデータを作成する関数
function createPost(id) {
  const likeCount = getLikesFromStorage(id); // localStorageからいいね数を取得
  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-avatar"></div>
            <div class="post-username">ユーザー ${id}</div>
        </div>
        <div class="post-content">
            ${id}の投稿です。「いいね」をクリックして、Vanilla JS、jQueryの速度を体感してください！
        </div>
        <div class="post-actions">
            <button class="like-button">いいね</button>
            <span class="like-count">いいね数 : ${likeCount}</span>
        </div>
    `;
  return postDiv;
}

// 100個の投稿を再描画する関数（遅延をシミュレート）
function renderPosts() {
  const app = document.getElementById("app");
  app.innerHTML = ""; // 既存の投稿をクリア
  const container = document.createElement("div");
  container.className = "container";
  app.appendChild(container);

  // サーバーからデータを取得するのをシミュレート（遅延を追加）
  setTimeout(() => {
    for (let i = 1; i <= 100; i++) {
      const post = createPost(i);
      container.appendChild(post);
    }
    attachLikeButtonListeners(); // いいねボタンにリスナーを付ける
  }, 1000); // 1秒の遅延をシミュレート
}

// 「いいね」ボタンにイベントリスナーを付与する関数
function attachLikeButtonListeners() {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((button, index) => {
    const postId = index + 1; // 投稿ID
    let likeCount = getLikesFromStorage(postId); // localStorageからいいね数を取得

    button.addEventListener("click", () => {
      likeCount++;
      button.nextElementSibling.textContent = `${likeCount} likes`;
      saveLikesToStorage(postId, likeCount); // いいね数をlocalStorageに保存
      renderPosts(); // 投稿全体を再描画（リアルDOMの非効率さを表現）
    });
  });
}

// 初期表示
renderPosts();
