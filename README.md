# MyPatientHUB — Enhanced React Dashboard

A React JSX dashboard prototype for navigating healthcare services with a consistent glass-inspired interface. The original component structure and image assets are retained where possible.

## Requirements
- Node.js (LTS recommended)
- npm

## Run locally
1. Open this folder in VS Code.
2. Run `npm install`.
3. Run `npm start`.
4. Open the localhost URL shown in the terminal.

If port 3000 is occupied, stop the old development server with `Ctrl+C` in its terminal, or accept the alternate port prompt. If dependency installation fails, remove `node_modules` and retry `npm install`; do not delete `src/` or `public/`.

## Included enhancements
- Shared page-aware header and navigation toggle.
- Global search routing to doctors, clinics, pharmacy directory, marketplace, and chat.
- Persistent light/dark theme preference.
- Notification popover with appointment and profile reminders.
- Redesigned doctor discovery and directory pages, specialty filters, and appointment-request modal saved in local storage.
- Redesigned clinic discovery and directory pages with search, specialty, age-group, and open-today filters.
- Chat page inspired by glass-style admin dashboard layouts; messages are stored locally in this browser.
- Modernized marketplace and pharmacy directory styling.

## Prototype limitations
This is a frontend demo. Booking requests, chat messages, and theme preferences are stored in browser `localStorage`; they are not sent to a real clinic or server. Map pages use an embedded public map. Real appointments, pharmacy availability, identity verification, secure messaging, and notifications require a backend and appropriate service integrations.
