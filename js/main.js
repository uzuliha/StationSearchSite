const initialInput =
    document.getElementById("initial");

const searchButton =
    document.getElementById("search-button");

const result =
    document.getElementById("result");

initializePrefectureButtons();

let stations = [];

loadStations();

async function loadStations() {

    const response =
        await fetch("data/stations.json");

    stations =
        await response.json();

    console.log(`駅データ読み込み完了: ${stations.length}駅`);
}

searchButton.addEventListener("click", () => {

    const initial =
        initialInput.value.trim();

    if (initial !== "" && !/^[ぁ-ん]$/.test(initial)) {
        displayMessage(
            "頭文字はひらがな1文字で入力してください。"
        );
        return;
    }

    const selectedPrefectures =
        getSelectedPrefectures();

    const filteredStations =
        searchStations(
            stations,
            initial,
            selectedPrefectures
        );

    displayResults(filteredStations);
});

function displayResults(stations) {

    result.innerHTML = "";

    if (stations.length === 0) {
        displayMessage("該当する駅がありません。");
        return;
    }

    for (const station of stations) {

        const li = document.createElement("li");

        const name = document.createElement("span");
        name.textContent =
            `${station.name}（${prefectures[station.prefecture - 1]}）`;

        const kana = document.createElement("span");
        kana.textContent = station.kana;
        kana.classList.add("station-kana");

        li.appendChild(name);
        li.appendChild(kana);

        result.appendChild(li);
    }
}

function displayMessage(message) {

    result.innerHTML = "";

    const li = document.createElement("li");

    li.textContent = message;

    result.appendChild(li);
}