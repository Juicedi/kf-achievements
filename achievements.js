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

/* Check text if it has one of given word list words. If a word is
 * found, return it. */
var getWordFoundInText = (text, wordList, defaultResult = '') => wordList.reduce((result, word) => {
  if (text.includes(word)) {
    result = word;
  }

  return result;
}, defaultResult);

var getData = () => {
  const achievementElementRows = [...document.querySelectorAll('.achieveRow')];

  const object = gamemodes.reduce((result, gamemode) => {
    result[gamemode] = {};
    result.collectibles = [];

    difficulties.forEach((difficulty) => {
      result[gamemode][difficulty] = [];
    });

    return result;
  }, {});

  return achievementElementRows.reduce(function testing(acc, element) {
    const text = element.querySelector('h5').innerText.toLowerCase();
    const gamemode = getWordFoundInText(text, gamemodes, 'survival');
    const isAchieved = !!element.querySelector('.achieveUnlockTime');
    const map = getWordFoundInText(text, maps);

    if (!map || isAchieved || text.includes('map as') ) {
      return acc;
    }

    const difficulty = getWordFoundInText(text, difficulties);
    const isAboutCollecting = !!getWordFoundInText(text, ['collect', 'destroy']);

    if (map && text.includes('hard or higher')) {
      acc[gamemode][difficulties[1]].push(map);
      acc[gamemode][difficulties[2]].push(map);
      acc[gamemode][difficulties[3]].push(map);
    } else if (map && difficulty) {
      acc[gamemode][difficulty].push(map);
    } else if (map && isAboutCollecting) {
      acc.collectibles.push(map);
    }

    return acc;
  }, object);
}

var getJson = (playerName) => {
  const data = {
    name: playerName,
    achievements: null,
  }

  data.achievements = getData();

  return JSON.stringify(data, null, 4);
}
