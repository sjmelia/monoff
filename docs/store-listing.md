# Store Listing

Use this as the source copy for Mozilla Add-ons, Chrome Web Store, release notes, and screenshot captions.

## Name

Monoff

## Short Summary

Render web pages in grayscale.

## Full Description

Monoff is a small browser extension that renders web pages in grayscale.

It is intentionally simple: there is no popup, no in-extension toggle, no per-site configuration, no schedules, and no intensity slider. To turn the effect off, disable the extension from your browser's extension manager.

Monoff also includes a minimal new tab page that displays the current time.

## Key Points

- Applies a grayscale stylesheet to web pages.
- Provides a quiet clock-only new tab page.
- Does not request extension API permissions such as storage, scripting, active tab access, alarms, or commands.
- Does not collect, transmit, sell, or share user data.
- Uses a static CSS content script rather than JavaScript running on pages.

## Permission Explanation

Monoff needs broad site access because its stylesheet is configured to run on web pages. The extension does not use JavaScript to read page content, does not store browsing data, and does not send data anywhere.

The browser may still describe this as access to site data because any extension code or stylesheet that runs across websites needs permission to affect those pages.

## Data Collection

Monoff does not collect or transmit any user data.

Firefox data collection declaration:

```json
{
  "required": ["none"]
}
```

## Screenshot Captions

- `sample-page-grayscale.png`: Monoff rendering a sample article page in grayscale.
- `newtab-clock.png`: The minimal Monoff new tab page with the current time.

## Release Notes

Initial release:

- Render web pages in grayscale.
- Add a minimal clock-only new tab page.
- Support Firefox and Chrome builds through WXT.
- Use generated PNG icons from a single SVG source.

## Support URL

https://github.com/sjmelia/monoff/issues

## Homepage

https://github.com/sjmelia/monoff

## Privacy Policy

Monoff does not collect, store, transmit, sell, or share personal data.
