(function initializeDataFetcher() {
  const players = [
    {
      name: 'example player name 1',
      url: 'https://steamcommunity.com/id/example-player-name-1/stats/232090/?tab=achievements',
    },
  ];

  const perks = [
    'berserker',
    'commando',
    'demolitionist',
    'medic',
    'firebug',
    'gunslinger',
    'sharpshooter',
    'support',
    'survivalist',
    'swat',
  ];

  const maps = [
    'airship',
    'ashwood asylum',
    'barmwich town',
    'biolapse',
    'biotics lab',
    'black forest',
    'burning paris',
    'carillon hamlet',
    'catacombs',
    'crash',
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

  const getData = (playerName, doc) => {
    const achievementElementRows = [...doc.querySelectorAll('.achieveRow')];

    const data = {
      name: playerName,
      achievements: gamemodes.reduce((result, gamemode) => {
        result[gamemode] = {};
        result.collectibles = [];
        result.perks = {};

        difficulties.forEach((difficulty) => {
          result[gamemode][difficulty] = [];
          result.perks[difficulty] = [];
        });

        return result;
      }, {})
    }

    data.achievements = achievementElementRows.reduce((achievementsData, element) => {
      const isAchieved = !!element.querySelector('.achieveUnlockTime');

      // Filter out achieved achievements
      if (isAchieved) return achievementsData;

      const text = element.querySelector('h5').innerText.toLowerCase();
      const gamemode = getWordFoundInText(text, gamemodes, 'survival');
      const map = getWordFoundInText(text, maps);
      const difficulty = getWordFoundInText(text, difficulties);
      const perk = getWordFoundInText(text, perks);
      const isAboutCollecting = !!getWordFoundInText(text, wordAboutCollecting);

      if (perk && difficulty) {
        achievementsData.perks[difficulty].push(perk);
      } else if (map && text.includes('hard or higher')) {
        achievementsData[gamemode][difficulties[1]].push(map);
        achievementsData[gamemode][difficulties[2]].push(map);
        achievementsData[gamemode][difficulties[3]].push(map);
      } else if (map && difficulty) {
        achievementsData[gamemode][difficulty].push(map);
      } else if (map && isAboutCollecting) {
        achievementsData.collectibles.push(map);
      }

      return achievementsData;
    }, data.achievements);

    return data;
  };

  const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const getDocument = (win) => new Promise((resolve, reject) => {
    if (['complete', 'interactive'].includes(win.document.readyState)) {
      resolve(win.document);
      return;
    }

    win.addEventListener('load', function () {
      resolve(win.document);
    });
  });

  const openPlayerPage = async (playerNumber, win, allData) => {
    const player = players[playerNumber];
    win.location.replace(player.url);

    await wait(1000);

    const doc = await getDocument(win);

    allData.push(getData(player.name, doc));

    const nextPlayerNumber = playerNumber + 1;

    if (nextPlayerNumber >= players.length) {
      console.log(allData);
      return;
    }

    await wait(1000);
    openPlayerPage(nextPlayerNumber, win, allData);
  };

  window.getAllData = () => {
    const allData = [];
    const win = window.open('', 'windowname');
    openPlayerPage(0, win, allData);
  };
}());
