# Store Listing

Use this as the source copy for Mozilla Add-ons, Chrome Web Store, release notes, and screenshot captions.

## Name

Monoff – Make pages monochrome

## Short Summary

Make any web page monochrome. No scripts on pages, no data collected, no configuration needed.

## Full Description

Monoff renders every web page in grayscale, making the web calmer, less distracting, and easier on the eyes.

It is intentionally minimal: there is no popup, no toggle, no per-site settings, no schedule, and no intensity slider. To turn the effect off, disable the extension from your browser's extension manager.

Monoff works by injecting a static CSS stylesheet — no JavaScript runs on your pages. It requests only the access that any content stylesheet needs, collects no data, and sends nothing anywhere.

## Key Points

- Applies a grayscale stylesheet to every web page.
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
- `wikipedia-grayscale.png`: Monoff rendering the Wikipedia article on Parrots in grayscale.
- `bbc-article-grayscale.png`: Monoff rendering a BBC Future article in grayscale.

## Release Notes

Initial release:

- Render web pages in grayscale.
- Support Firefox and Chrome builds through WXT.
- Use generated PNG icons from a single SVG source.

## Support URL

https://github.com/sjmelia/monoff/issues

## Homepage

https://github.com/sjmelia/monoff

## Privacy Policy

Monoff does not collect, store, transmit, sell, or share personal data.
