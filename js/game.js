// 動物リストと画像データ
const animals = [
    { name: "ライオン", image: "assets/images/lion.png" },
    { name: "キリン", image: "assets/images/giraffe.png" },
    { name: "ゾウ", image: "assets/images/elephant.png" },
];

// ランダムに動物を選ぶ
let currentAnimal = getRandomAnimal();
const leaf = document.getElementById("leaf");
const choices = document.querySelectorAll(".choice-button");
const result = document.getElementById("result");

// ゲーム初期化
function initGame() {
    currentAnimal = getRandomAnimal();
    leaf.style.backgroundImage = "url('assets/images/leaf.png')"; // 葉っぱ画像を設定
    leaf.style.display = "block"; // 葉っぱを表示
    result.textContent = ""; // 結果メッセージをクリア
}

// ランダムに動物を取得
function getRandomAnimal() {
    return animals[Math.floor(Math.random() * animals.length)];
}

// プレイヤーの選択を確認
choices.forEach((choice) => {
    choice.addEventListener("click", (event) => {
        const userChoice = event.target.textContent.trim(); // ユーザーの選択を取得
        const correctAnswer = currentAnimal.name.trim(); // 正解の動物名を取得

        // 正解かどうかをチェック
        if (userChoice.toLowerCase() === correctAnswer.toLowerCase()) {
            result.textContent = "正解"; // 正解メッセージ
            result.style.color = "green"; // 緑色で表示
        } else {
            result.textContent = "残念、不正解！"; // 不正解メッセージ
            result.style.color = "red"; // 赤色で表示
        }

        // 葉っぱを隠して動物を表示
        leaf.style.backgroundImage = `url(${currentAnimal.image})`; // 動物画像を表示
        leaf.style.display = "block";

        // 次の問題に進む（葉っぱを再表示）
        setTimeout(() => {
            initGame(); // ゲームをリセット
        }, 2000); // 2秒後にリセット
    });
});


// 初期化
initGame();
