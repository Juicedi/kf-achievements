(function initializeDataFetcher() {
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
    'castle volter',
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
    'subduction',
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

  const difficulties = {
    normal: 'normal',
    hard: 'hard',
    suicidal: 'suicidal',
    hellonearth: 'hell on earth',
  };

  const wordAboutCollecting = ['collect', 'destroy'];

  /* Check text if it has one of given word list words. If a word is
   * found, return it. */
  const getWordFoundInText = (text, wordList, defaultResult = '') => {
    const [word = defaultResult] = wordList.filter(word => text.includes(word));
    return word;
  };

  const getData = (playerName, doc) => {
    const achievementElementRows = [...doc.querySelectorAll('.achieveRow')];

    const data = {
      name: playerName,
      achievements: gamemodes.reduce((result, gamemode) => {
        result[gamemode] = {};
        result.collectibles = [];
        result.perks = {};

        Object.values(difficulties).forEach((difficulty) => {
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
      const difficulty = getWordFoundInText(text, Object.values(difficulties));
      const perk = getWordFoundInText(text, perks);
      const isAboutCollecting = !!getWordFoundInText(text, wordAboutCollecting);

      if (perk && difficulty) {
        achievementsData.perks[difficulty].push(perk);
      } else if (map && text.includes('hard or higher')) {
        achievementsData[gamemode][difficulties.hard].push(map);
        achievementsData[gamemode][difficulties.suicidal].push(map);
        achievementsData[gamemode][difficulties.hellonearth].push(map);
      } else if (map && difficulty) {
        achievementsData[gamemode][difficulty].push(map);
      } else if (map && isAboutCollecting) {
        achievementsData.collectibles.push(map);
      }

      return achievementsData;
    }, data.achievements);

    return data;
  };

  const getCookie = (name) => document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith(`${name}=`))
    ?.split('=')[1] || null;

  const cookie = getCookie('profiles');

  console.assert(!!cookie, 'Cookie is missing, Run the script from the profile-ids.js file. Check README.md for more information.');

  /*
   * Get the steam profile IDs and names from the cookie and split them into an array
   *
   * The player data should be in following format in the cookie:
   * profileID1:-:playername1,profileID2:-:playername2
   */
  const allPlayerData = cookie.split(',').map(d => {
    const split = d.split(':-:');
    const PROFILE_ID_INDEX = 0;
    const NAME_INDEX = 1;

    return {
      profileID: split[PROFILE_ID_INDEX],
      name: split[NAME_INDEX],
    }
  });

  const allData = [];

  allPlayerData.forEach(function(playerData, loopIndex) {
    const { profileID, name } = playerData;
    const isProfileIDNumber = isNaN(parseInt(profileID, 10));

    // Steam profile URL
    const url = isProfileIDNumber
      ? `https://steamcommunity.com/id/${profileID}/stats/232090/achievements/`
      : `https://steamcommunity.com/profiles/${profileID}/stats/232090/achievements/`;

    // Fetch the profile page HTML
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        allData.push(getData(name, doc));
        console.log(allData);
      })
      .catch(error => console.log(error));
  });
}());
