# cst-web-pricing-calculator

This is an internal tool for Lickd staff to determine the ratecard and AVV information for YouTube channels.

## Development

This tool is build step free, serve it in a browser with any HTTP server. For instance:

```bash
npx simplehttpserver -p 8080 .
```

To keep dependencies in one place, third party packages are loaded via `modules/deps.mjs` and exposed to the rest of the codebase by exporting as necessary.

Where possible, use an ESM compatible verison of the package, or even better don't load a third party package at all.

Vue components are kept withing `modules/components`. Because we include the parser, templates can be provided in a `template` property of the exported component, usually in a template literal string to allow for line breaks and static variable insertion.

We use [goober](https://github.com/cristianbote/goober) to provide lightweight CSS-in-JS functionality, although we currently only use it to generate class names to attach a styles string to a unique class name.