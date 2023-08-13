/* global dataCollection maps */

// TODO: Sort rows based on how many marks they have
// TODO: Make buttons that can change what is visible
(function main() {
  const maps = [
    'airship',             'ashwood asylum',    'barmwich town',
    'biolapse',            'biotics lab',       'black forest',
    'burning paris',       'carillon hamlet',   'catacombs', 'crash',
    'containment station', 'desolation',        'diesector',
    'dystopia 2029',       'elysium',           'evacuation point',
    'farmhouse',           'hellmark station',  'hostile grounds',
    'infernal realm',      'krampus lair',      'lockdown',
    'monster ball',        'moonbase',          'netherhold',
    'nightmare',           'nuked',             'outpost',
    'power core',          'prison',            'rig',
    'sanitarium',          'santa\'s workshop', 'shopping spree',
    'spillway',            'steam fortress',    'subduction',
    'the descent',         'tragic kingdom',    'volter manor',
    'zed landing',
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
