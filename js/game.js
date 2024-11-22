// 動物リストと画像データ
const animals = [
    { name: "ライオン", image: "assets/images/lion.png" },
    { name: "キリン", image: "assets/images/giraffe.png" },
    { name: "ゾウ", image: "assets/images/elephant.png" },
];

// 動的変数
let currentAnimals = [];
let shuffledChoices = [];
let glowingLeafIndex = null;

// DOM要素の取得
const animalElements = document.querySelectorAll(".animal");
const leafElements = document.querySelectorAll(".leaf");
const choices = document.querySelectorAll(".choice-button");
const result = document.getElementById("result");

// ゲーム初期化関数
function initGame() {
    result.textContent = ""; // 前回の結果をリセット
    result.style.opacity = "0"; // 結果を非表示にする

    currentAnimals = shuffleArray(animals); // 動物の順序をランダムに
    shuffledChoices = shuffleArray([...currentAnimals]); // 回答ボタンもランダムに


    // 動物の初期化
    animalElements.forEach((animal, index) => {
        animal.classList.remove("move-down"); // アニメーションクラスを削除
        animal.style.transform = ""; // transformをリセット
        requestAnimationFrame(() => {
            animal.style.backgroundImage = `url(${currentAnimals[index].image})`; // 動物の画像を設定
            animal.style.transform = "translateY(0)"; // 動物の初期位置を設定
            animal.style.opacity = "1"; // 動物を表示
        });
    });

    // 葉っぱの初期化
    leafElements.forEach((leaf) => {
        leaf.style.backgroundImage = "url('assets/images/leaf.png')"; // 葉っぱの画像を設定
        leaf.classList.remove("glow"); // 赤く光る効果を削除
    });

    choices.forEach((choice) => {
        choice.classList.remove("show"); // 回答ボタンを非表示
    });

    // 動物をアニメーションで葉っぱに移動させる
    setTimeout(() => {
        animalElements.forEach((animal) => {
            animal.style.transform = "translateY(140px)"; // 動物を葉っぱに重なる位置に移動
            
            setTimeout(() => {
                animal.style.opacity = "0"; // 動物を非表示にする
            }, 2000); // アニメーション終了後に非表示
            animal.classList.add("move-down"); // アニメーションを開始
        });

        // 動物が葉っぱに隠れた後、赤く光る葉っぱを表示
        setTimeout(() => {
            glowingLeafIndex = Math.floor(Math.random() * leafElements.length); // ランダムに1つの葉っぱを選択
            leafElements[glowingLeafIndex].classList.add("glow"); // 選択された葉っぱを赤く光らせる

            // 回答ボタンを表示
            choices.forEach((choice, index) => {
                choice.style.backgroundImage = `url(${shuffledChoices[index].image})`; // ボタン画像を設定
                choice.classList.add("show"); // ボタンを表示
            });
        }, 2000); // 動物が隠れるアニメーション後
    }, 100); // タイミング調整用
}

// 配列をランダムに並び替えるシャッフル関数
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5); // 配列をランダムに並び替え
}

// 回答ボタンのクリックイベントリスナー
choices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
        const selectedAnimal = currentAnimals[glowingLeafIndex]; // 赤く光った葉っぱに隠れた動物

        // 正解判定
        if (choice.style.backgroundImage.includes(selectedAnimal.image)) {
            result.textContent = "〇 正解！"; // 正解のメッセージ
            result.style.color = "green"; // 緑色で表示
        } else {
            result.textContent = "× 不正解！"; // 不正解のメッセージ
            result.style.color = "red"; // 赤色で表示
        }

        result.style.opacity = "1"; // 結果を表示

        leafElements[glowingLeafIndex].style.backgroundImage = `url(${selectedAnimal.image})`; // 答え合わせで動物を表示
        leafElements[glowingLeafIndex].classList.remove("glow"); // 赤く光る効果を削除

        setTimeout(initGame, 2000); // 次の問題を開始
    });
});

// ゲーム開始
initGame(); // 初回ゲームを開始
