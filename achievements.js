(function initializeDataFetcher() {
  const maps = [
    'airship',             'ashwood asylum',    'barmwich town',
    'biolapse',            'biotics lab',       'black forest',
    'burning paris',       'carillon hamlet',   'catacombs',
    'containment station', 'desolation',        'diesector',
    'dystopia 2029',       'elysium',           'evacuation point',
    'farmhouse',           'hellmark station',  'hostile grounds',
    'infernal realm',      'krampus lair',      'lockdown',
    'monster ball',        'moonbase',          'netherhold',
    'nightmare',           'nuked',             'outpost',
    'power core',          'prison',            'rig',
    'sanitarium',          'santa\'s workshop', 'shopping spree',
    'spillway',            'steam fortress',    'the descent',
    'tragic kingdom',      'volter manor',      'zed landing',
  ];

  const gamemodes = [
    'survival',
    'endless',
    'objective',
  ];

  const difficulties = [
    'normal',
    'hard',
    'suicidal',
    'hell on earth',
  ];

  const wordAboutCollecting = ['collect', 'destroy'];

  /* Check text if it has one of given word list words. If a word is
   * found, return it. */
  const getWordFoundInText = (text, wordList, defaultResult = '') => wordList.reduce((result, word) => {
    if (text.includes(word)) {
      result = word;
    }

    return result;
  }, defaultResult);

  const achievementElementRows = [...document.querySelectorAll('.achieveRow')];

  window.getData = () => {
    const playerName = prompt('Write player\'s name in the input field below.');

    const data = {
      name: playerName,
      achievements: gamemodes.reduce((result, gamemode) => {
        result[gamemode] = {};
        result.collectibles = [];

        difficulties.forEach((difficulty) => {
          result[gamemode][difficulty] = [];
        });

        return result;
      }, {})
    }

    data.achievements = achievementElementRows.reduce((achievementsData, element) => {
      const text = element.querySelector('h5').innerText.toLowerCase();
      const gamemode = getWordFoundInText(text, gamemodes, 'survival');
      const isAchieved = !!element.querySelector('.achieveUnlockTime');
      const map = getWordFoundInText(text, maps);

      // Filter out irrelevant and achieved achievements
      if (!map || isAchieved || text.includes('map as') ) return achievementsData;

      const difficulty = getWordFoundInText(text, difficulties);
      const isAboutCollecting = !!getWordFoundInText(text, wordAboutCollecting);

      if (text.includes('hard or higher')) {
        achievementsData[gamemode][difficulties[1]].push(map);
        achievementsData[gamemode][difficulties[2]].push(map);
        achievementsData[gamemode][difficulties[3]].push(map);
      } else if (difficulty) {
        achievementsData[gamemode][difficulty].push(map);
      } else if (isAboutCollecting) {
        achievementsData.collectibles.push(map);
      }

      return achievementsData;
    }, data.achievements);

    return data;
  }
}());
