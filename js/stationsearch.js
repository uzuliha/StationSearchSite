function searchStations(stations, initial, prefectures) {

    return stations.filter(station => {

        const matchesInitial =
            initial === "" ||
            station.kana.startsWith(initial);

        const matchesPrefecture =
            prefectures.length === 0 ||
            prefectures.includes(station.prefecture);

        return matchesInitial && matchesPrefecture;
    });
}