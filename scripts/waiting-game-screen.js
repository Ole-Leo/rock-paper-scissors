function renderWaitingGameStartScreen() {
  const waitingRivalText = document.createElement('div');
  waitingRivalText.textContent = 'Waiting for your rival 🥷';
  waitingRivalText.classList.add('waiting-list');

  setPageLayout(waitingRivalText);

  async function gameStatus() {
    const response = await getResponse(
      `/game-status?token=${GAME.token}&id=${GAME.gameID}`
    );
    GAME.rival = response['game-status'].enemy;

    if (GAME.rival !== undefined) {
      GAME.timers.forEach(timer => {
        clearInterval(timer);
        GAME.renderScreen('gameMove');
      });
    }
  }

  const checkGameStatus = setInterval(gameStatus, 500);

  GAME.timers.push(checkGameStatus);
}

GAME.screens.waitingGameStart = renderWaitingGameStartScreen;
