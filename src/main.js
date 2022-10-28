/* global dataCollection maps */

// TODO: pivot table so the least marks is first and most is last
// TODO: Make buttons that can change what is visible
(function main() {
  const thead = document.querySelector('thead tr');
  const tbody = document.querySelector('tbody');

  console.log(dataCollection);

  maps.forEach((map) => {
    const newRow = document.createElement('TR');
    const mapName = document.createElement('TD');

    mapName.innerText = map;
    newRow.appendChild(mapName);

    let markCount = 0;

    document.getElementById('dataKey').innerText = 'Survival hard';

    dataCollection.forEach((data) => {
      const mark = document.createElement('TD');

      if (data.achievements.survival.hard.includes(map)) {
        markCount++;
        mark.innerText = 'x';
      } else {
        mark.innerText = ' ';
      }

      newRow.appendChild(mark);
    });

    if (markCount > 0) {
      tbody.appendChild(newRow);
    }
  });

  dataCollection.forEach((data) => {
    const playerName = document.createElement('TH');
    playerName.innerText = data.name;
    thead.appendChild(playerName);
  });
}());
