/* global dataCollection maps */

// TODO: Sort rows based on how many marks they have
// TODO: Make buttons that can change what is visible
(function main() {
  const maps = [
    'airship',           'ashwood asylum',   'barmwich town',
    'biolapse',          'biotics lab',      'black forest',
    'burning paris',     'carillon hamlet',  'catacombs',
    'crash',             'castle volter',    'containment station',
    'desolation',        'diesector',        'dystopia 2029',
    'elysium',           'evacuation point', 'farmhouse',
    'hellmark station',  'hostile grounds',  'infernal realm',
    'krampus lair',      'lockdown',         'monster ball',
    'moonbase',          'netherhold',       'nightmare',
    'nuked',             'outpost',          'power core',
    'prison',            'rig',              'sanitarium',
    'santa\'s workshop', 'shopping spree',   'spillway',
    'steam fortress',    'subduction',       'the descent',
    'tragic kingdom',    'volter manor',     'zed landing',
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

  const mapImages = {
    'airship': 'https://wiki.killingfloor2.com/images/a/a6/KF2_Map_Airship.png',
    'ashwood asylum': 'https://wiki.killingfloor2.com/images/6/6a/KF2_AshwoodAsylum_thumbnail.png',
    'barmwich town': 'https://wiki.killingfloor2.com/images/1/11/Kf2_MapPreview_BarmwichTown.png',
    'biolapse': 'https://wiki.killingfloor2.com/images/9/90/KF2_MapPreview_Biolapse.png',
    'biotics lab': 'https://wiki.killingfloor2.com/images/4/43/KF2_Map_BioticsLab.png',
    'black forest': 'https://wiki.killingfloor2.com/images/9/9e/KF2_Map_BlackForest.png',
    'burning paris': 'https://wiki.killingfloor2.com/images/d/da/KF2_Map_BurningParis.png',
    'carillon hamlet': 'https://wiki.killingfloor2.com/images/7/74/Kf2_MapPreview_CarillonHamlet.png',
    'catacombs': 'https://wiki.killingfloor2.com/images/1/11/KF2_Map_Catacombs.png',
    'crash': 'https://wiki.killingfloor2.com/images/5/58/KF2_MapPreview_Crash.png',
    'castle volter': 'https://wiki.killingfloor2.com/images/b/b1/UI_MapPreview_VolterCastle.png',
    'containment station': 'https://wiki.killingfloor2.com/images/e/e3/KF2_Map_ContainmentStation.png',
    'desolation': 'https://wiki.killingfloor2.com/images/5/50/KF2_MapPreview_Desolation.png',
    'diesector': 'https://wiki.killingfloor2.com/images/2/2d/KF2_Map_DieSector.png',
    'dystopia 2029': 'https://wiki.killingfloor2.com/images/2/2f/KF2_MapPreview_Dystopia_2029.jpg',
    'elysium': 'https://wiki.killingfloor2.com/images/d/d9/KF2_MapPreview_Elysium.png',
    'evacuation point': 'https://wiki.killingfloor2.com/images/5/5a/KF2_Map_EvacuationPoint.png',
    'farmhouse': 'https://wiki.killingfloor2.com/images/1/18/KF2_Map_Farmhouse.png',
    'hellmark station': 'https://wiki.killingfloor2.com/images/e/ed/KF2_Map_HellMark.png',
    'hostile grounds': 'https://wiki.killingfloor2.com/images/8/8e/KF2_Map_HostileGrounds.png',
    'infernal realm': 'https://wiki.killingfloor2.com/images/c/c8/KF2_Map_InfernalRealm.png',
    'krampus lair': 'https://wiki.killingfloor2.com/images/d/d5/KF2_Map_KrampusLair.png',
    'lockdown': 'https://wiki.killingfloor2.com/images/0/05/KF2_Map_Lockdown.png',
    'monster ball': 'https://wiki.killingfloor2.com/images/5/5f/KF2_Map_MonsterBall.png',
    'moonbase': 'https://wiki.killingfloor2.com/images/b/b5/KF2_Map_MoonBase_Preview.png',
    'netherhold': 'https://wiki.killingfloor2.com/images/5/55/KF2_MapPreview_Netherhold.png',
    'nightmare': 'https://wiki.killingfloor2.com/images/a/a1/KF2_Map_Nightmare.png',
    'nuked': 'https://wiki.killingfloor2.com/images/a/ab/KF2_Map_Nuked.png',
    'outpost': 'https://wiki.killingfloor2.com/images/e/ee/KF2_Map_Outpost.png',
    'power core': 'https://wiki.killingfloor2.com/images/7/7f/KF2_Map_PowerCore.png',
    'prison': 'https://wiki.killingfloor2.com/images/f/fb/KF2_Map_Prison.png',
    'rig': 'https://wiki.killingfloor2.com/images/d/df/KF2_MapPreview_Rig.png',
    'sanitarium': 'https://wiki.killingfloor2.com/images/7/77/Kf2_sanitarium_thumb.jpg',
    'santa\'s workshop': 'https://wiki.killingfloor2.com/images/7/7b/KF2_Map_SantasWorkshop.png',
    'shopping spree': 'https://wiki.killingfloor2.com/images/6/6b/KF2_Map_ShoppingSpree.png',
    'spillway': 'https://wiki.killingfloor2.com/images/f/fa/KF2_Map_Spillway.png',
    'steam fortress': 'https://wiki.killingfloor2.com/images/2/2a/KF2_Map_Steam_Fortress.png',
    'subduction': 'https://wiki.killingfloor2.com/images/a/a8/Kf2_UI_MapPreview_Subduction.png',
    'the descent': 'https://wiki.killingfloor2.com/images/6/64/KF2_Map_TheDescent.png',
    'tragic kingdom': 'https://wiki.killingfloor2.com/images/3/3b/KF2_Map_TragicKingdom.png',
    'volter manor': 'https://wiki.killingfloor2.com/images/8/8c/KF2_Map_VolterManor.png',
    'zed landing': 'https://wiki.killingfloor2.com/images/d/d3/KF2_Map_Zed_Landing.png',
  };

  const title = document.getElementById('dataKey');
  const content = document.getElementById('content');
  const allPlayers = document.getElementById('all-players');

  const resetSelectedButton = () => {
    document.querySelectorAll('button').forEach((button) => {
      button.classList.remove('selected');
    });
  };

  const showContent = (mode, difficulty, players) => {
    const list = mode === 'perks'
      ? perks
      : maps;

    const mapsWithMissingCompletions = list.reduce((mapsMissingCompletions, map) => {
      const data = {
        name: map,
        players: [],
      };

      const playersWithMissingData = mode === 'collectibles'
        ? dataCollection.filter(data => data.achievements[mode].includes(map)).map(data => data.name)
        : dataCollection.filter(data => data.achievements[mode][difficulty].includes(map)).map(data => data.name);

      if (playersWithMissingData.length === 0) {
        return mapsMissingCompletions;
      }

      data.players = playersWithMissingData;
      mapsMissingCompletions.push(data);
      return mapsMissingCompletions;
    }, []);

    mapsWithMissingCompletions.forEach(map => {
      const mapElement = document.createElement('DIV');
      mapElement.classList.add('map');

      if (mapImages[map.name]) {
        const mapImage = document.createElement('IMG');
        mapImage.classList.add('map-image');
        mapImage.src = mapImages[map.name];
        mapElement.appendChild(mapImage);
      } else {
        mapElement.classList.add('no-image');
      }

      const playerList = document.createElement('UL');
      playerList.classList.add('players');

      map.players.forEach(player => {
        const listItem = document.createElement('LI');
        listItem.classList.add('player');
        listItem.classList.add(`player${players.indexOf(player)}`);
        playerList.appendChild(listItem);
      });

      const mapNameElement = document.createElement('P');
      mapNameElement.classList.add('map__name');
      mapNameElement.innerText = map.name;

      mapElement.appendChild(mapNameElement);
      mapElement.appendChild(playerList);
      content.appendChild(mapElement);
    });
  };

  const players = dataCollection.map(data => data.name);

  players.forEach(player => {
    const listItem = document.createElement('LI');
    const playerIndex = players.indexOf(player);
    const playerClass = `player${playerIndex}`;
    listItem.dataset.playerIndex = playerIndex;
    listItem.classList.add(playerClass);
    listItem.classList.add('player-name');
    listItem.innerText = player;
    allPlayers.appendChild(listItem);
  });

  allPlayers.childNodes.forEach(node => {
    window.fadeoutTimeout = -1;

    node.addEventListener('mouseenter', function() {
      if (window.fadeoutTimeout > -1) {
        clearTimeout(window.fadeoutTimeout);
        window.fadeoutTimeout = -1;
      }

      const fadeClasses = players.reduce((acc, item, index) => {
        if (index === parseInt(node.dataset.playerIndex, 10)) {
          return acc;
        }

        acc.push(`.player${index}`)
        return acc;
      }, []);

      const fadeElements = document.querySelectorAll(fadeClasses.join(', '));

      fadeElements.forEach(fadeNode => {
        fadeNode.classList.add('fade');
      });

      document.querySelectorAll(`.player${node.dataset.playerIndex}`).forEach(currentNode => {
        currentNode.classList.remove('fade');
      });
    });

    node.addEventListener('mouseleave', function() {
      window.fadeoutTimeout = setTimeout(() => {
        document.querySelectorAll('.fade').forEach(node => {
          node.classList.remove('fade');
        });
      }, 300);
    });
  });

  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const mode = event.currentTarget.dataset.mode;
      const difficulty = mode === 'collectibles' ? '' : event.currentTarget.dataset.difficulty;
      resetSelectedButton();
      button.classList.add('selected');
      document.body.className = '';
      document.body.classList.add(mode);
      title.innerText = `${mode} ${difficulty}`;
      title.classList.add('capitalize');
      content.innerHTML = '';
      showContent(mode, difficulty, players);
    });
  });

  if (dataCollection.length === 0) {
    let message = 'Missing data.\n\n';
    message += 'Have you put any playername1.js to the data directory?\n\n';
    message += 'Have you added the \n<script type="text/javascript" src="data/playername1.js"></script>\n tags to the index.html?\n\n';
    message += '(Also make sure that the tag has the same "data/playername1.js" filename that is in the data directory.)';
    alert(message);
  }
}());
