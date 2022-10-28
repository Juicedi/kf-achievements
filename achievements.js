var maps = [
  'airship',
  'ashwood asylum',
  'barmwich town',
  'biolapse',
  'biotics lab',
  'black forest',
  'burning paris',
  'carillon hamlet',
  'catacombs',
  'containment station',
  'desolation',
  'diesector',
  'dystopia 2029',
  'elysium',
  'evacuation point',
  'farmhouse',
  'hellmark station',
  'hostile grounds',
  'infernal realm',
  'krampus lair',
  'lockdown',
  'monster ball',
  'moonbase',
  'netherhold',
  'nightmare',
  'nuked',
  'outpost',
  'power core',
  'prison',
  'rig',
  'sanitarium',
  'santa\'s workshop',
  'shopping spree',
  'spillway',
  'steam fortress',
  'the descent',
  'tragic kingdom',
  'volter manor',
  'zed landing',
];

var gamemodes = [
  'survival',
  'endless',
  'objective',
];

var difficulties = [
  'normal',
  'hard',
  'suicidal',
  'hell on earth',
];

function getMapFromText(text) {
  let foundMap = '';

  maps.forEach((map) => {
    if (text.indexOf(map) > -1) {
      foundMap = map;
    }
  });

  console.assert(foundMap !== '', 'this text has no map: ' + text);

  return foundMap;
}

function getTextGamemode(text) {
  let foundGamemode = '';

  gamemodes.forEach((gamemode) => {
    if (text.indexOf(gamemode) > -1) {
      foundGamemode = gamemode;
    }
  });

  return foundGamemode;
}

function test() {
  const object = {};

  gamemodes.forEach((gamemode) => {
    object[gamemode] = {};
    difficulties.forEach((difficulty) => {
      object[gamemode][difficulty] = [];
    });
  });

  const rows = [...document.querySelectorAll('.achieveRow')];

  return rows.reduce(function testing(acc, element) {
    const text = element.querySelector('h5').innerText.toLowerCase();
    const gamemode = getTextGamemode(text);
    const isAchieved = !!element.querySelector('.achieveUnlockTime');
    ;

    if (gamemode === '' || text.indexOf('map as') > -1) {
      return acc;
    }
    if (text.indexOf('hard or higher') > -1 && !isAchieved) {
      acc[gamemode][difficulties[1]].push(getMapFromText(text));
      acc[gamemode][difficulties[2]].push(getMapFromText(text));
      acc[gamemode][difficulties[3]].push(getMapFromText(text));
    } else {
      difficulties.forEach((difficulty) => {
        if (text.indexOf(difficulty) > -1 && !isAchieved) {
          acc[gamemode][difficulty].push(getMapFromText(text));
        }
      });
    }

    return acc;
  }, object);
}
