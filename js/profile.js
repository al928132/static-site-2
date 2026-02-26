function showMessage(elementId, text, type) {
    const el = document.getElementById(elementId);
    el.textContent = text;
    el.className = 'profile-message ' + type;
}

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'account.html';
        return;
    }

    // Pre-fill fields with current values
    if (user.displayName) {
        document.getElementById('profile-name').value = user.displayName;
    }
    document.getElementById('profile-email').value = user.email;

    // Show avatar if one exists
    if (user.photoURL) {
        document.getElementById('avatar-img').src = user.photoURL;
        document.getElementById('avatar-img').classList.remove('hidden');
        document.getElementById('avatar-placeholder-icon').classList.add('hidden');
    }

    // --- Avatar Picker ---
    let selectedAvatarSrc = null;

    document.getElementById('avatar-upload-btn').addEventListener('click', () => {
        document.getElementById('avatar-picker').classList.toggle('hidden');
    });

    document.querySelectorAll('.avatar-option').forEach((option) => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedAvatarSrc = option.dataset.src;

            const avatarImg = document.getElementById('avatar-img');
            avatarImg.src = selectedAvatarSrc;
            avatarImg.classList.remove('hidden');
            document.getElementById('avatar-placeholder-icon').classList.add('hidden');
            document.getElementById('avatar-save-btn').classList.remove('hidden');
        });
    });

    // --- Save Avatar ---
    document.getElementById('avatar-save-btn').addEventListener('click', () => {
        if (!selectedAvatarSrc) return;

        user.updateProfile({ photoURL: selectedAvatarSrc })
            .then(() => {
                showMessage('avatar-message', 'Avatar saved.', 'success');
                document.getElementById('avatar-picker').classList.add('hidden');
                document.getElementById('avatar-save-btn').classList.add('hidden');

                const navAvatar = document.getElementById('nav-avatar');
                if (navAvatar) navAvatar.src = selectedAvatarSrc;
            })
            .catch((error) => {
                showMessage('avatar-message', error.message, 'error');
            });
    });

    // --- Save Email ---
    document.getElementById('email-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newEmail = document.getElementById('profile-email').value.trim();

        user.verifyBeforeUpdateEmail(newEmail)
            .then(() => {
                showMessage('email-message', `A verification link has been sent to ${newEmail}. Your email will update once you click it.`, 'success');
            })
            .catch((error) => {
                if (error.code === 'auth/requires-recent-login') {
                    showMessage('email-message', 'For security, please log out and log back in before changing your email.', 'error');
                } else {
                    showMessage('email-message', error.message, 'error');
                }
            });
    });

    // --- Save Password ---
    document.getElementById('password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newPassword     = document.getElementById('profile-password').value;
        const confirmPassword = document.getElementById('profile-password-confirm').value;

        if (newPassword !== confirmPassword) {
            showMessage('password-message', 'Passwords do not match.', 'error');
            return;
        }

        user.updatePassword(newPassword)
            .then(() => {
                showMessage('password-message', 'Password updated.', 'success');
                document.getElementById('password-form').reset();
            })
            .catch((error) => {
                if (error.code === 'auth/requires-recent-login') {
                    showMessage('password-message', 'For security, please log out and log back in before changing your password.', 'error');
                } else {
                    showMessage('password-message', error.message, 'error');
                }
            });
    });

    // --- Save Display Name ---
    document.getElementById('name-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('profile-name').value.trim();

        user.updateProfile({ displayName: newName })
            .then(() => {
                showMessage('name-message', 'Display name updated.', 'success');

                // Update the name shown in the nav immediately
                const navUser = document.querySelector('.nav-user');
                if (navUser) navUser.textContent = newName || user.email;
            })
            .catch((error) => {
                showMessage('name-message', error.message, 'error');
            });
    });
});
