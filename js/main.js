const initialInput =
    document.getElementById("initial");

const searchButton =
    document.getElementById("search-button");

const result =
    document.getElementById("result");

initializePrefectureButtons();

let stations = [];
let lines = [];

loadData();

async function loadData() {

    const [stationsResponse, linesResponse] =
        await Promise.all([
            fetch("data/stations.json"),
            fetch("data/lines.json")
        ]);

    stations =
        await stationsResponse.json();

    lines =
        await linesResponse.json();

    console.log(`駅データ読み込み完了: ${stations.length}駅`);
    console.log(`路線データ読み込み完了: ${lines.length}路線`);
}

searchButton.addEventListener("click", () => {

    const initial =
        initialInput.value.trim();

    if (initial === "") {
        displayMessage(
            "頭文字をひらがな1文字で入力してください。"
        );
        return;
    }

    if (!/^[ぁ-ん]$/.test(initial)) {
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

        // 左側の駅情報
        const stationInfo = document.createElement("div");
        stationInfo.classList.add("station-info");

        const name = document.createElement("div");
        name.textContent =
            `${station.name}（${prefectures[station.prefecture - 1]}）`;

        const kana = document.createElement("div");
        kana.textContent = station.kana;
        kana.classList.add("station-kana");

        stationInfo.appendChild(name);
        stationInfo.appendChild(kana);

        // 右側の路線名
        const line = document.createElement("div");

        const lineData =
            lines.find(x => x.id === station.line);

        line.textContent =
            lineData ? lineData.name : "不明な路線";

        line.classList.add("station-line");

        li.appendChild(stationInfo);
        li.appendChild(line);

        result.appendChild(li);
    }
}

function displayMessage(message) {

    result.innerHTML = "";

    const li = document.createElement("li");

    li.textContent = message;

    result.appendChild(li);
}