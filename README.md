# Coursebook (offline app)

Coursebook keeps track of subjects, activities, links, comments, teacher remarks and photo, screenshot and video proof. It works without internet and saves everything on the device it runs on.

**Open the app:** https://kurtmoi.github.io/coursebook/

Coursebook is a Progressive Web App (PWA): a web app you can install on a phone, tablet or computer. It is not a native app store app.

## Files

| File | What it does |
|---|---|
| `index.html` | The app |
| `manifest.webmanifest` | App name, icon and colors, so phones and computers can install it |
| `sw.js` | Keeps the app's files on the device so it opens offline |
| `icons/` | App icons |

## Put it online once

The app needs a secure (`https://`) web address the first time each device opens it. After that it works offline. Opening `index.html` straight from a folder does **not** work offline and can't be installed.

Any static web host works. These are two free options:

- **Netlify Drop:** go to app.netlify.com/drop and drag the `coursebook-app` folder onto the page. You get an `https://….netlify.app` address.
- **GitHub Pages:** this repository is already published at https://kurtmoi.github.io/coursebook/

Only the files in this folder are put online. Your records and attachments never leave the device.

## Install it

Open the address on each device, then tap **Install & backup** in the app's header:

- **iPhone / iPad:** Safari → Share → Add to Home Screen
- **Android:** Chrome → Install app (or ⋮ → Add to Home screen)
- **Computer:** Chrome or Edge → install icon in the address bar; Safari on Mac → File → Add to Dock

## Your data

- Data is saved in the browser's storage on **that device only**. Devices do not sync with each other.
- Clearing the browser's site data, or removing the app, erases it. Use **Install & backup → Download backup** regularly.
- To move to another device, download a backup on the old device and use **Restore from backup** on the new one.

## Updating the app

After changing `index.html`, also change `VERSION` in `sw.js` (for example `coursebook-v2`). Devices then pick up the new version the next time they open the app online.
