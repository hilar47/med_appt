# StayHealthy

StayHealthy is a non-profit healthcare platform that connects patients in remote and underserved areas with
doctors anytime, from anywhere. This repository contains the front-end web application built as part of
StayHealthy's **Go Digital** initiative — a modern, responsive, accessible interface for finding doctors,
booking appointments, and managing patient accounts, built to sit in front of a back-end API.

## Features

- Patient and doctor registration and login
- Doctor search by name, specialty, and location
- Full appointment booking (name, phone, date, time) and a short "request a call back" form
- Appointment cancellation
- Post-visit doctor reviews, disabled after submission to prevent duplicates
- Editable patient profile
- Application-wide toast notifications
- SEO meta tags and a production-ready build

## Tech stack

- [React](https://react.dev/) with [Vite](https://vitejs.dev/) as the build tool
- [React Router](https://reactrouter.com/) for client-side routing
- Plain CSS with a token-based design system (see `src/index.css`)

## Project structure

```
stayhealthy/
├── index.html              # SEO meta tags + font loading
├── src/
│   ├── api/api.js          # All back-end API calls (register, login, search, book, cancel, review...)
│   ├── context/             # NotificationContext (app-wide toast state)
│   ├── components/         # Navbar, DoctorCard, FindDoctorSearch, AppointmentForm(IC),
│   │                       #   GiveReviews, ProfileCard, Notification
│   ├── pages/               # Home, Sign_Up, Login, Appointments, Profile
│   ├── App.jsx              # Routes + app-wide providers
│   ├── main.jsx             # Entry point
│   └── index.css            # Design tokens and shared styles
└── public/
    └── favicon.svg
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/<your-username>/stayhealthy.git
   cd stayhealthy
   npm install
   ```

2. Configure the API base URL. Copy the example environment file and point it at your back-end:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `VITE_API_BASE_URL` to your API's base URL (defaults to `http://localhost:5000/api`).

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

### Production build

```bash
npm run build
```

This generates an optimized, deployment-ready build in the `dist/` folder. Preview it locally with:

```bash
npm run preview
```

## Deployment

The `dist/` folder produced by `npm run build` is a static site and can be deployed to any static host
(e.g. Vercel, Netlify, GitHub Pages, or a CDN of your choice). Point the host's build command at
`npm run build` and its publish directory at `dist`.

## About this project

This is a fictitious project built for a front-end development course assignment, simulating the UI/UX
design and React implementation of a telehealth platform for a non-profit organization.
