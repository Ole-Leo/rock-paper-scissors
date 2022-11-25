function gameButtonsEngine() {
  return {
    tag: 'div',
    cls: 'move-buttons',
    content: [
      {
        tag: 'button',
        cls: 'btn',
        content: 'Rock 👊',
        attrs: {
          'data-move': 'rock',
        },
      },
      {
        tag: 'button',
        cls: 'btn',
        content: 'Scissors ✌',
        attrs: {
          'data-move': 'scissors',
        },
      },
      {
        tag: 'button',
        cls: 'btn',
        content: 'Paper ✋',
        attrs: {
          'data-move': 'paper',
        },
      },
    ],
  };
}

function renderWhoRivalText(container) {
  const againstWho = document.createElement('p');
  againstWho.classList.add('gamepage-text');
  againstWho.textContent = `You vs. ${GAME.rival.login}🥷`;
  container.appendChild(againstWho);
}

GAME.blocks.rivalText = renderWhoRivalText;

function renderGameMoveScreen() {
  const gamePageContent = document.createElement('div');
  gamePageContent.classList.add('gamepage-content');

  gamePageContent.appendChild(templateEngine(gameButtonsEngine()));
  GAME.renderBlock('rivalText', gamePageContent);

  setPageLayout(gamePageContent);

  const moveButtons = document.querySelectorAll('.btn');

  async function sentMoveValue(event) {
    const { move } = event.target.dataset;

    const response = await getResponse(
      `/play?token=${GAME.token}&id=${GAME.gameID}&move=${move}`
    );
    if (response) GAME.renderScreen('waitingRivalMove');
  }

  moveButtons.forEach(moveButton => {
    moveButton.addEventListener('click', sentMoveValue);
  });
}

GAME.screens.gameMove = renderGameMoveScreen;
