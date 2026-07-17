# Mobile Pilot Logbook & Schedule App ✈️

A mobile-first web application designed as a day-to-day logbook and schedule companion for pilots. Built with a minimalist, operational, and professional "Airline Operations" aesthetic (inspired by Susi Air).

This project is a front-end prototype. It does not require a backend or real API integration. All data is populated using static mock JSON files provided for the technical assessment.

## 🛠 Tech Stack

* **Framework:** Nuxt.js 4 (Vue 3, Composition API, `<script setup>`)
* **State Management:** Pinia
* **Styling:** Tailwind CSS (Mobile-first approach)
* **Charting:** `vue-chartjs` (Chart.js)
* **Language:** TypeScript

## ✨ Features & App Flow

The application consists of three main screens, designed with a mobile-first philosophy (optimized for 390px width) and responsive adjustments for tablet/desktop (Sidebar layout).

### 1. Sign In Page

* **Flow:** The entry point of the app.
* **Functionality:** Mock authentication. Users can enter any username/password. Clicking **Sign In** routes directly to the Dashboard.

### 2. Dashboard (Home Page)

* **Header:** Displays pilot profile (avatar, name, rank), total flight hours, and a notification bell.
* **Upcoming Flight:** Shows the immediate next flight with route details (Origin to Destination).
* **Latest News:** A horizontal scrolling list of company updates or advisories.
* **Hours to Limit:**

  * Displays 4 summary cards showing the pilot's current flight hours vs. regulatory limits (Daily, Weekly, Monthly, Annual).
  * Features a line chart (`vue-chartjs`) that visualizes the **rolling sum** of flight hours over a selected window (1w, 1m, 3m, 6m, 1y). *Note: Today's date is mocked as 31 May 2026.*
* **My Documents:** Lists operational documents with color-coded expiry statuses (Green = Valid, Amber = Expiring soon, Red = Expired).

### 3. Schedule Page (Calendar)

* **Flow:** Accessed via the bottom navigation (mobile) or sidebar (desktop).
* **Functionality:** A custom-built monthly calendar (no third-party heavy libraries).
* **Visuals:** Days are marked with color-coded dots representing specific Duty Types (e.g., On Duty, Standby, Leave).
* **Interaction:** Tapping a date opens a clean, inline "Detail page coming soon" placeholder.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18.x or newer) and `npm` installed.

### Installation

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

2. **Install dependencies:**

```bash
npm install
```

### Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Build for Production

Build the application for production deployment:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```text
├── assets/
├── components/
│   ├── BaseCard.vue             # Reusable card wrapper
│   ├── SectionHeader.vue        # Reusable title for dashboard sections
│   ├── StatusBadge.vue          # Pill badge for document expiry
│   └── HoursTrendChart.vue      # Chart.js wrapper for rolling sums
├── composables/                 # Reusable Vue composables (if any)
├── layouts/
│   └── default.vue              # Main layout containing responsive bottom-nav / sidebar
├── pages/
│   ├── index.vue                # Sign-In page
│   ├── dashboard.vue            # Home / Dashboard
│   └── schedule.vue             # Calendar & Duty tracking
├── stores/
│   ├── pilot.ts                 # Pinia store containing rolling sum logic & flight data
│   └── schedule.ts              # Pinia store for calendar duty types
├── public/
│   ├── mock-flight-hours.json
│   ├── mock-documents.json
│   └── mock-schedules.json
└── nuxt.config.ts               # Nuxt configuration and Tailwind setup
```

---

## 🧮 Data & Logic Notes

* **Mock Data:** The app relies entirely on the provided mock JSON files. No external API calls are made.
* **Rolling Sum Calculation:** The chart on the Dashboard calculates Y-values based on a *rolling sum* formula: `Y(D) = sum of flight hours from (D - windowDays + 1) up to D`.
* **Time Travel:** For development and data visualization purposes, "Today" is permanently hardcoded/treated as **31 May 2026** to properly display historical and future mock data bounds.

---

## 📚 Libraries & Design Decisions

* **Nuxt.js 4** – Provides a scalable project structure, file-based routing, and an excellent developer experience.
* **Pinia** – Official Vue state management library with a simple API and TypeScript support.
* **Tailwind CSS** – Chosen to build a responsive, mobile-first interface efficiently while maintaining a consistent design system.
* **vue-chartjs / Chart.js** – Used to visualize rolling flight hour trends in a lightweight and interactive way.
* **Mobile-first Design** – The interface is optimized for mobile devices first, as pilots are more likely to access operational information while on the move, with responsive enhancements for larger screens.

---

## 💡 What I'd Do Differently With More Time

* Integrate a real authentication flow instead of mock login.
* Replace static JSON files with REST API integration.
* Add loading, empty, and error states throughout the application.
* Improve accessibility (keyboard navigation, ARIA labels, and focus management).
* Add unit tests for components and Pinia stores.
* Implement detailed schedule pages instead of placeholders.
* Add search and filtering for operational documents.
* Optimize performance with lazy loading and route-level code splitting.
* Add dark mode and internationalization (i18n) support.

---

## 📝 Notes

This project was developed as part of the Susi Air Frontend Developer technical assessment.

The application intentionally uses mock data only, following the assessment requirements. The current date is fixed to **31 May 2026** to ensure calculations and visualizations remain consistent with the provided datasets.
