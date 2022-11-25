function renderLogoutButton(container) {
  const logoutButton = document.createElement('button');

  logoutButton.classList.add('btn');
  logoutButton.textContent = 'Logout';

  logoutButton.addEventListener('click', () => {
    GAME.renderScreen('loginForm');
  });

  container.appendChild(logoutButton);
}

function renderGameResult(container, text) {
  const resultText = document.createElement('div');

  resultText.classList.add('gamepage-text');
  resultText.textContent = text;

  container.appendChild(resultText);
}

GAME.blocks.logoutButton = renderLogoutButton;
GAME.blocks.gameResult = renderGameResult;

function renderResultScreen(text) {
  const resultPageContent = document.createElement('div');
  resultPageContent.classList.add('gamepage-content');

  const resultButtons = document.createElement('div');
  resultButtons.classList.add('result-btns');

  resultPageContent.appendChild(resultButtons);

  GAME.renderBlock('playButton', resultButtons);
  GAME.renderBlock('logoutButton', resultButtons);
  GAME.renderBlock('gameResult', resultPageContent, text);

  setPageLayout(resultPageContent);
}

GAME.screens.resultScreen = renderResultScreen;
