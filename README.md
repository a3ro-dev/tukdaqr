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
