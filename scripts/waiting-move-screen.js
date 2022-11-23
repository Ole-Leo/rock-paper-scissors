function renderWaitingRivalMoveScreen() {
  const waitingRivalMoveText = document.createElement('div');
  waitingRivalMoveText.textContent = `Waiting for rival's move 🥷`;
  waitingRivalMoveText.classList.add('waiting-list');

  setPageLayout(waitingRivalMoveText);

  async function moveStatus() {
    const response = await getResponse(
      `/game-status?token=${GAME.token}&id=${GAME.gameID}`
    );
    GAME.gameStatus = response['game-status'].status;

    if (
      GAME.gameStatus === 'win' ||
      GAME.gameStatus === 'lose' ||
      GAME.gameStatus === 'waiting-for-your-move'
    ) {
      GAME.timers.forEach(timer => {
        clearInterval(timer);
      });
    }

    if (GAME.gameStatus === 'win') {
      GAME.renderScreen('resultScreen', 'You won!🐱');
    }

    if (GAME.gameStatus === 'lose') {
      GAME.renderScreen('resultScreen', 'You have been pwned!😿');
    }

    if (GAME.gameStatus === 'waiting-for-your-move') {
      const sameMoveText = document.createElement('div');
      sameMoveText.textContent = `Same moves ➡ next round`;
      sameMoveText.classList.add('waiting-list');

      setPageLayout(sameMoveText);

      setTimeout(() => {
        GAME.renderScreen('gameMove');
      }, 1500);
    }
  }

  const checkMoveStatus = setInterval(moveStatus, 500);

  GAME.timers.push(checkMoveStatus);
}

GAME.screens.waitingRivalMove = renderWaitingRivalMoveScreen;
