firebase.auth().onAuthStateChanged((user) => {
    const item = document.getElementById('nav-auth-item');
    if (!item) return;

    if (user) {
        const name = user.displayName || user.email;
        const avatarTag = user.photoURL
            ? `<img src="${user.photoURL}" id="nav-avatar" class="nav-avatar" alt="avatar">`
            : '';
        item.innerHTML = `<a href="profile.html" class="nav-user">${avatarTag}${name}</a><a href="#" id="nav-logout">Log Out</a>`;
        document.getElementById('nav-logout').addEventListener('click', (e) => {
            e.preventDefault();
            firebase.auth().signOut();
        });
    } else {
        item.innerHTML = `<a href="account.html">Log In</a>`;
    }
});
