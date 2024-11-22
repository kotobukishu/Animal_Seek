// 動物リストと画像データ
const animals = [
    { name: "ライオン", image: "assets/images/lion.png" },
    { name: "キリン", image: "assets/images/giraffe.png" },
    { name: "ゾウ", image: "assets/images/elephant.png" },
];

// 動的変数
let currentAnimals = [];
let glowingLeafIndex = null;
const leafElements = document.querySelectorAll(".leaf");
const choices = document.querySelectorAll(".choice-button");
const result = document.getElementById("result");

// 初期化
function initGame() {
    // 動物を3種類ランダムに選択
    currentAnimals = shuffleArray(animals).slice(0, 3);

    // 各葉っぱに動物を割り当て
    leafElements.forEach((leaf, index) => {
        leaf.style.backgroundImage = `url(${currentAnimals[index].image})`;
        leaf.classList.remove("glow");
    });

    // ボタンに動物の画像を設定
    choices.forEach((choice, index) => {
        choice.style.backgroundImage = `url(${currentAnimals[index].image})`;
    });

    // 2秒後に葉っぱで隠す
    setTimeout(() => {
        leafElements.forEach((leaf) => {
            leaf.style.backgroundImage = "url('assets/images/leaf.png')";
        });

        // ランダムに葉っぱを赤く光らせる
        glowingLeafIndex = Math.floor(Math.random() * leafElements.length);
        leafElements[glowingLeafIndex].classList.add("glow");
    }, 2000);

    // 結果リセット
    result.textContent = "";
}

// シャッフル関数
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// プレイヤーの選択を確認
choices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
        const selectedAnimal = currentAnimals[glowingLeafIndex];

        // 正解判定
        if (choice.style.backgroundImage.includes(selectedAnimal.image)) {
            result.textContent = "正解！";
            result.style.color = "green";
        } else {
            result.textContent = "残念、不正解！";
            result.style.color = "red";
        }

        // 赤く光った葉っぱを消して動物を表示
        leafElements[glowingLeafIndex].style.backgroundImage = `url(${selectedAnimal.image})`;
        leafElements[glowingLeafIndex].classList.remove("glow");

        // 次の問題に進む
        setTimeout(initGame, 2000);
    });
});

// 初期化
initGame();
