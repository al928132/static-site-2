# Auth Feature Build Plan

## Overview

Add sign up, log in, log out, and account management to the Barber's static site
using **Firebase Authentication** and **Firebase Storage** — no backend server needed.

---

## Steps

### Step 1 — Create a Firebase Project and Add the SDK

**What you'll do:**
- Create a free project at [firebase.google.com](https://firebase.google.com)
- Enable **Email/Password** sign-in under Authentication > Sign-in method
- Copy the Firebase config object (apiKey, authDomain, etc.)
- Add the Firebase SDK `<script>` tags to `index.html`
- Confirm the app initializes without console errors

**How to test:**
Open `index.html` in a browser. Open DevTools Console — no errors should appear.

---

### Step 2 — Build the Sign Up / Log In Page (UI only)

**What you'll do:**
- Create `account.html` with two forms: one for Sign Up, one for Log In
- Use tabs or a toggle link to switch between the two forms
- Style to match the site's brand (Linen background, Mahogany headings, etc.)
- Add placeholder error/success message areas beneath each form

**How to test:**
Open `account.html`. Click between Sign Up and Log In views. Forms display cleanly,
no broken layout. No JavaScript logic yet.

---

### Step 3 — Wire Up Sign Up

**What you'll do:**
- Create `js/auth.js` and link it to `account.html`
- On Sign Up form submit: call `createUserWithEmailAndPassword(email, password)`
- On success: show a "Account created!" message
- On failure: show the Firebase error message in the error area

**How to test:**
Fill in the Sign Up form with a new email and password. Submit it. Open the Firebase
console (Authentication > Users) and confirm the new user appears.

---

### Step 4 — Wire Up Log In

**What you'll do:**
- On Log In form submit: call `signInWithEmailAndPassword(email, password)`
- On success: redirect to `index.html`
- On failure: display the error message

**How to test:**
Use the credentials you created in Step 3 to log in. You should land on `index.html`.
Try wrong credentials — confirm a readable error message appears.

---

### Step 5 — Reflect Auth State in the Navigation

**What you'll do:**
- Create `js/nav-auth.js` and link it to all four pages (index, about, services, contact)
- Use `onAuthStateChanged()` to detect whether a user is logged in
- When **logged out**: show a "Log In" link in the nav
- When **logged in**: show the user's display name (or email) and a "Log Out" button

**How to test:**
While logged in, reload any page — your name/email and Log Out button appear in the nav.
Open a private/incognito tab (not logged in) — the Log In link appears instead.

---

### Step 6 — Wire Up Log Out

**What you'll do:**
- Attach a click handler to the Log Out button in the nav
- Call `signOut()` and reload the page (or redirect to `account.html`)

**How to test:**
Click Log Out. The nav immediately switches back to showing the Log In link.
Refreshing the page keeps you logged out.

---

### Step 7 — Build the Profile / Account Settings Page (UI only)

**What you'll do:**
- Create `profile.html`, only accessible when logged in (redirect to `account.html` if not)
- Add a section to update **Display Name** (text input + Save button)
- Add a section to update **Email** (text input + Save button)
- Add a section to update **Password** (two password inputs + Save button)
- Add an avatar display area (circular image placeholder + upload button)
- Style to match the site brand

**How to test:**
While logged in, navigate to `profile.html`. All sections render cleanly.
While logged out, navigating to `profile.html` should redirect to `account.html`.

---

### Step 8 — Save Display Name Changes

**What you'll do:**
- On Display Name form submit: call `updateProfile(user, { displayName })`
- Show a success or error message
- Update the nav immediately to reflect the new name

**How to test:**
Enter a new display name and save. Check the nav — the name updates without a page
reload. Reload the page — the new name persists.

---

### Step 9 — Save Email Changes

**What you'll do:**
- On Email form submit: call `updateEmail(user, newEmail)`
- Show a success or error message (Firebase may require recent login — handle that error with a clear message)

**How to test:**
Change the email to a new address and save. Log out, then log back in with the new
email — it should work.

---

### Step 10 — Save Password Changes

**What you'll do:**
- Validate that both password fields match before submitting
- On submit: call `updatePassword(user, newPassword)`
- Show a success or error message

**How to test:**
Enter mismatched passwords — confirm the error appears before any Firebase call is made.
Enter matching passwords and save. Log out, then log back in with the new password.

---

### Step 11 — Set Up Firebase Storage and Avatar Upload UI

**What you'll do:**
- Enable **Firebase Storage** in the Firebase console
- Add the Firebase Storage SDK script to `profile.html`
- Wire up the avatar upload button to open a file picker (accept images only)
- Show a preview of the selected image before uploading

**How to test:**
Click the upload button, select an image. A preview of that image appears on the page.
Nothing is saved yet — just a local preview.

---

### Step 12 — Upload and Save the Avatar

**What you'll do:**
- On upload confirm: use `uploadBytes()` to save the image to Firebase Storage at
  `avatars/{userId}`
- Get the download URL with `getDownloadURL()`
- Call `updateProfile(user, { photoURL })` to attach it to the user's account
- Display the avatar in the profile page and in the nav

**How to test:**
Upload an image. The avatar updates on the profile page. Reload — it persists.
Check other pages — the nav shows the avatar next to the user's name.

---

## Summary

| Step | Deliverable |
|------|-------------|
| 1 | Firebase project connected |
| 2 | `account.html` UI |
| 3 | Sign up working |
| 4 | Log in working |
| 5 | Nav reflects auth state |
| 6 | Log out working |
| 7 | `profile.html` UI |
| 8 | Display name updates |
| 9 | Email updates |
| 10 | Password updates |
| 11 | Avatar upload UI + preview |
| 12 | Avatar saved and displayed |
