// --- Tab Toggle ---

const tabSignup  = document.getElementById('tab-signup');
const tabLogin   = document.getElementById('tab-login');
const panelSignup = document.getElementById('panel-signup');
const panelLogin  = document.getElementById('panel-login');

function showSignup() {
    panelSignup.classList.remove('hidden');
    panelLogin.classList.add('hidden');
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
}

function showLogin() {
    panelLogin.classList.remove('hidden');
    panelSignup.classList.add('hidden');
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
}

tabSignup.addEventListener('click', showSignup);
tabLogin.addEventListener('click', showLogin);

document.getElementById('go-to-login').addEventListener('click', (e) => {
    e.preventDefault();
    showLogin();
});

document.getElementById('go-to-signup').addEventListener('click', (e) => {
    e.preventDefault();
    showSignup();
});

// --- Sign Up ---

function showMessage(elementId, text, type) {
    const el = document.getElementById(elementId);
    el.textContent = text;
    el.className = 'account-message ' + type;
}

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email    = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm  = document.getElementById('signup-confirm').value;

    if (password !== confirm) {
        showMessage('signup-message', 'Passwords do not match.', 'error');
        return;
    }

    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            showMessage('signup-message', 'Account created! You can now log in.', 'success');
            document.getElementById('signup-form').reset();
        })
        .catch((error) => {
            showMessage('signup-message', error.message, 'error');
        });
});

// --- Log In ---

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email    = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch(() => {
            showMessage('login-message', 'Incorrect email or password. Please try again.', 'error');
        });
});
