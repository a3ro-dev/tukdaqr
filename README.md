# TukdaQR

A private, browser-only UPI QR splitter. It divides one amount into chunks of at most ₹1,999 and creates downloadable QR codes using standard `upi://pay` links.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm test
npm run build
```

The site does not track or confirm payments. Always verify credits in the recipient's bank or UPI app.

## Architecture and security

TukdaQR is a static multi-page Vite site. It has no backend, database, accounts, cookies, analytics, secrets, or paid APIs. Payment details are processed in the browser and are not uploaded. Production uses HTTPS, a restrictive Content Security Policy, and same-origin CORS.

Dependencies are pinned and checked with `npm audit`. GitHub Actions runs the tests and production build on every push and pull request.

## License

MIT. The runtime QR generator, `qrcode`, is also MIT licensed.
