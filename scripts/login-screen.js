function loginFormEngine() {
  return {
    tag: 'form',
    cls: 'login-form',
    content: [
      {
        tag: 'label',
        content: 'Your Nickname',
        attrs: {
          for: 'login',
        },
      },
      {
        tag: 'input',
        cls: 'login-input',
        attrs: {
          id: 'login',
          autofocus: 'true',
        },
      },
      {
        tag: 'button',
        cls: 'btn',
        content: 'Sign In ✅',
      },
      {
        tag: 'div',
        cls: ['error-text', 'visibility'],
        content: `We still need your nickname, ninja 🥷`,
      },
    ],
  };
}

function renderLoginScreen() {
  setPageLayout(templateEngine(loginFormEngine()));

  const loginForm = document.querySelector('.login-form');
  const loginInput = document.querySelector('.login-input');
  const error = document.querySelector('.error-text');

  async function sentLoginRequest(event) {
    event.preventDefault();

    if (loginInput.value === '') {
      error.classList.remove('visibility');
      loginInput.addEventListener('focus', () => {
        error.classList.add('visibility');
      });
    } else {
      const tokenRes = await getResponse(`/login?login=${loginInput.value}`);
      GAME.token = tokenRes.token;
      const statusRes = await getResponse(`/player-status?token=${GAME.token}`);

      if (statusRes['player-status'].status === 'game') {
        GAME.gameID = statusRes['player-status'].game.id;
        GAME.renderScreen('waitingGameStart');
      } else {
        GAME.renderScreen('lobby');
      }
    }
  }

  loginForm.addEventListener('submit', sentLoginRequest);
}

window.application.screens.loginForm = renderLoginScreen;
window.application.renderScreen('loginForm');
