function renderPlayersList(container) {
  const playersList = document.createElement('div');
  playersList.classList.add('players-list');

  async function renderPlayersList() {
    const response = await getResponse(`/player-list`);
    GAME.list = response.list;
    playersList.textContent = '';

    GAME.list.forEach(player => {
      const playerNick = document.createElement('p');
      playerNick.classList.add('player-nickname');
      playerNick.textContent = `🥷 ${player.login}`;
      playersList.appendChild(playerNick);
    });
  }

  renderPlayersList();

  const loadPlayersList = setInterval(renderPlayersList, 2000);

  GAME.timers.push(loadPlayersList);

  container.appendChild(playersList);
}

function renderPlayButton(container) {
  const playButton = document.createElement('button');
  playButton.textContent = 'Play';
  playButton.classList.add('btn');

  async function startGame() {
    const response = await getResponse(`/start?token=${GAME.token}`);
    GAME.gameID = response['player-status'].game.id;

    GAME.timers.forEach(timer => {
      clearInterval(timer);
    });

    GAME.renderScreen('waitingGameStart');
  }

  playButton.addEventListener('click', startGame);

  container.appendChild(playButton);
}

GAME.blocks.playersList = renderPlayersList;
GAME.blocks.playButton = renderPlayButton;

function renderLobbyScreen() {
  const content = document.createElement('div');
  content.classList.add('lobby-content');

  const lobbyButtons = document.createElement('div');
  lobbyButtons.classList.add('move-buttons');

  GAME.renderBlock('playersList', content);
  GAME.renderBlock('playButton', lobbyButtons);
  GAME.renderBlock('logoutButton', lobbyButtons);

  content.appendChild(lobbyButtons);

  setPageLayout(content);
}

GAME.screens.lobby = renderLobbyScreen;
