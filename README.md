# Monoff – Make pages monochrome

Monoff is a small WebExtension that renders web pages in grayscale.

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
- `public/icon.svg`: editable source icon.
- `public/icon-*.png`: generated extension icons (committed, regenerate with `npm run icons`).
- `tools/generate-icons.js`: regenerates PNG icons from the SVG source.
- `tools/generate-screenshots.js`: captures store screenshots.
- `screenshots/sample-page.html`: local fixture used by the screenshot tool.
- `screenshots/*.png`: committed store screenshots.
- `docs/store-listing.md`: store listing copy.
- `store/amo-metadata.json`: AMO metadata used for listed submissions.

## Tools

Two one-off tools live in `tools/` and produce committed output. Run them manually when their inputs change, review the output, then commit.

### Icons

Regenerates `public/icon-*.png` from `public/icon.svg`:

```sh
npm run icons
```

### Screenshots

Captures store screenshots into `screenshots/`. Requires a Chrome build in `dist/chrome-mv3/`:

```sh
npm run build
npm run screenshots
```

Generated screenshots:

- `screenshots/sample-page-grayscale.png`
- `screenshots/wikipedia-grayscale.png`
- `screenshots/bbc-article-grayscale.png`

## Permissions

Monoff does not request extension API permissions such as `storage`, `scripting`, `activeTab`, `alarms`, or `commands`.

The grayscale effect is a static CSS content script that matches `<all_urls>`, so browsers still treat it as broad site access. CSS cannot read page text like JavaScript can, but it can affect page presentation, so the browser permission remains intentionally broad.

Firefox output declares no data collection with `required: ["none"]`.

## Packaging

WXT writes unpacked builds and zip packages to `dist/`.

```sh
npm run build
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

The GitHub Actions workflow typechecks, builds, and zips both browser packages. It can also sign an unlisted Firefox package when run manually with `AMO_JWT_ISSUER` and `AMO_JWT_SECRET` repository secrets configured.

Publishing a GitHub Release from the UI with a tag named `vX.Y.Z` submits the Firefox build as a listed AMO version and attaches release artifacts. The release tag version must match `package.json`. Listed AMO submissions may not appear publicly until Mozilla review completes.

## Dependency Updates

Dependabot is configured for npm dependencies, GitHub Actions, and devcontainer Features.
