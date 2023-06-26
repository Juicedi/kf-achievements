const getCookie = (name) => document.cookie
  .split('; ')
  .find(cookie => cookie.startsWith(`${name}=`))
  ?.split('=')[1] || null;

const setCookie = (name, value, days) => {
  const expires = days
    ? `; expires=${new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()}`
    : '';

  document.cookie = `${name}=${value}${expires}; path=/`;
};

const players = [
  {
    name: 'player 1',
    profileID: 'thisistheprofileid',
  },
  {
    name: 'player 2',
    profileID: '93875384758348504',
  },
];

/*
 * The player data should be in following format in the cookie:
 * profileID1:-:playername1,profileID2:-:playername2
 */
const playersString = players.map(s => `${s.profileID}:-:${s.name}`).join(',');
setCookie('profiles', playersString, 10);
console.log(getCookie('profiles'));
