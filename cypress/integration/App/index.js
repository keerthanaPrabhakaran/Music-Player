const audio = document.getElementById('audio');
const li = document.querySelectorAll('#playlist li');
const playList = document.getElementById('playlist'); // ul
const initialCapacity = 3;
const store = {};
let currentSong = 0;
const username = 'User1';

playlist.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    currentSong = Array.from(playlist.children).indexOf(e.target);
    audio.src = e.target.getAttribute('data-src'); // Adding URL to src attribute
    audio.play();
    setActiveSong(currentSong);  // Add active-song class to currently playing songs

    if (!store[username]) {
      store[username] = [];
    }

    const recentlyPlayedSongs = store[username];
    recentlyPlayedSongs.unshift(e.target.innerText);

    if (recentlyPlayedSongs.length > initialCapacity) {
      recentlyPlayedSongs.splice(initialCapacity);
    }

    displayRecentlyPlayed();
  }
});

function displayRecentlyPlayed () {
  const recentlyPlayedElement = document.getElementById('recentlyPlayed');
  recentlyPlayedElement.innerHTML = '';

  const username = 'User1';
  if (store[username]) {
    store[username].forEach((song, index) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${song}`;
      recentlyPlayedElement.appendChild(listItem);
    });
  }
}

function openTab (tabName) {
  const tabs = document.getElementsByClassName('tab-content');
  for (const tab of tabs) {
    tab.classList.remove('active');
  }

  const tabButtons = document.getElementsByClassName('tab-btn');
  for (const btn of tabButtons) {
    btn.classList.remove('active');
  }

  const tabElement = document.getElementById(tabName);
  tabElement.classList.add('active');

  const activeTabBtn = document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"]`);
  activeTabBtn.classList.add('active');

  if (tabName === 'recentlyPlayedTab') {
    displayRecentlyPlayed();
  }
}

const setActiveSong = (index) => {
  // remove "active" class from previously active song
  playlist.querySelector('.active-song').classList.remove('active-song');

  // add "active" class to currently playing song
  const activeSong = playlist.querySelectorAll('li')[index];
  activeSong.classList.add('active-song');
};
