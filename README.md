# Monoff

Monoff is a small WebExtension that renders web pages in grayscale. It also includes a quiet new tab page that shows the current time.

There is no popup, toggle, per-site setting, schedule, or intensity slider. To turn the effect off, disable the extension from the browser's extension manager.

## Development

This project uses npm and WXT.

```sh
npm ci
npm run lint
npm run build
```

Run a development browser:

```sh
npm run dev:firefox
npm run dev:chrome
```

## Source Layout

- `wxt.config.ts`: manifest metadata and CSS content script registration.
- `src/entrypoints/grayscale.content.css`: grayscale stylesheet.
- `src/entrypoints/newtab/`: clock-only new tab page.
- `public/icon.svg`: editable source icon.
- `public/icon-*.png`: generated extension icons.
- `scripts/generate-icons.js`: regenerates PNG icons.
- `scripts/generate-screenshots.js`: creates store screenshots.
- `screenshots/sample-page.html`: local screenshot fixture.
- `docs/store-listing.md`: store listing copy.

## Permissions

Monoff does not request extension API permissions such as `storage`, `scripting`, `activeTab`, `alarms`, or `commands`.

The grayscale effect is a static CSS content script that matches `<all_urls>`, so browsers still treat it as broad site access. CSS cannot read page text like JavaScript can, but it can affect page presentation, so the browser permission remains intentionally broad.

Firefox output declares no data collection with `required: ["none"]`.

## Packaging

WXT writes unpacked builds and zip packages to `dist/`.

```sh
npm run build
npm run screenshots
npm run zip
```

Useful individual commands:

```sh
npm run zip:firefox
npm run zip:chrome
```

Generated outputs include:

- `dist/firefox-mv3`
- `dist/chrome-mv3`
- `dist/monoff-1.0.0-firefox.zip`
- `dist/monoff-1.0.0-chrome.zip`

The GitHub Actions workflow typechecks, builds, generates screenshots, and zips both browser packages. It can also sign an unlisted Firefox package when run manually with `AMO_JWT_ISSUER` and `AMO_JWT_SECRET` repository secrets configured.

## Screenshots

Screenshots are generated from local, stable pages instead of live news sites. This avoids changing headlines, ads, cookie prompts, regional layouts, and third-party scripts.

```sh
npm run build
npm run screenshots
```

Generated screenshots:

- `dist/screenshots/sample-page-grayscale.png`
- `dist/screenshots/newtab-clock.png`

## Dependency Updates

Dependabot is configured for npm dependencies, GitHub Actions, and devcontainer Features.
