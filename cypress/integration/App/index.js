const audio = document.getElementById('audio');
const playList = document.getElementById('playlist'); // ul
const initialCapacity = 3;
const store = {};
let currentSong = 0;
const username = 'User1';   // For example we consider username as user1

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
    recentlyPlayedSongs.unshift(e.target.innerText);  // Adds recently played songs to list

    if (recentlyPlayedSongs.length > initialCapacity) {
      recentlyPlayedSongs.splice(initialCapacity);  // Eliminate the least recently played songs when the store is full
    }

    displayRecentlyPlayed();
  }
});

function displayRecentlyPlayed () {
  const recentlyPlayedElement = document.getElementById('recentlyPlayed');
  recentlyPlayedElement.innerHTML = '';

  if (store[username]) {
    store[username].forEach((song) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${song}`;
      recentlyPlayedElement.appendChild(listItem); // Appending list of songs played in recent played songs tab
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

function pauseAudio () {
  audio.pause(); // Pause the current audio
}
