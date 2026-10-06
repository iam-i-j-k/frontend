# Personalized Content Dashboard

A dynamic, fully responsive Next.js application designed as a comprehensive personalized content dashboard. This project fulfills all core requirements and bonus features for the Frontend Development Assignment.

## 🌟 Key Features

- **Personalized Content Feed**: Integrates directly with the **NewsAPI** (for real-world news) and **TMDB API** (for movie recommendations) based on the user's selected preference categories.
- **Real-Time Data Integration**: Implements live polling against the public **HackerNews API**. If a new story is published globally, it instantly streams to the top of your personalized feed every 15 seconds.
- **Authentication (NextAuth.js)**: Features a robust mocked login system. The interface updates dynamically, allowing users to sign in and out securely.
- **Multi-language Support (i18n)**: Fully internationalized using `react-i18next`. Users can instantly toggle the entire UI between English and Spanish via the header dropdown.
- **User Preferences**: Users can curate their feed by selecting categories via the Settings panel. Selections are persisted across sessions using `redux-persist` via `localStorage`.
- **Dynamic Reordering**: Smooth Drag-and-Drop capability using `framer-motion`, allowing users to vertically reorder their single-column content feed effortlessly.
- **Search Functionality**: A robust, debounced search feature filters feed content in real-time.
- **State Management**: Built with Redux Toolkit to manage API payloads, search queries, real-time items, user favorites, and persistent user preferences.
- **Theme Support**: Includes a comprehensive dark/light mode toggle powered by `next-themes` and Tailwind CSS v4.
- **Premium UI**: Implements glassmorphism, dynamic hover states, responsive layouts, and vibrant typography for a stunning first impression.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit & redux-persist
- **Animations/Drag-n-Drop**: Framer Motion
- **Authentication**: NextAuth.js
- **Internationalization**: react-i18next
- **Icons**: Lucide React
- **Testing**: Jest (Unit) & Cypress (E2E)

---

## 🚀 Setup & Run Instructions

### 1. Installation
Navigate into the project directory and install the dependencies:
```bash
# If you are in the root directory, navigate to frontend
cd frontend
npm install
```

### 2. Environment Variables
This app utilizes live data APIs. You must set up your environment keys.
1. Copy the example file to create your local environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and add your free API keys:
   - **NewsAPI**: Get a free key from [newsapi.org](https://newsapi.org/)
   - **TMDB API**: Get a free key from [themoviedb.org](https://www.themoviedb.org/documentation/api)

*Note: If API keys are omitted or rate-limited, the application will robustly fall back to high-quality mock data so the app never crashes.*

### 3. Run the Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧭 User Flow Guide

Here is the intended flow to experience all features of the application:

1. **Authentication**
   - Click the **Login** button in the top right header.
   - You will be redirected to the custom login screen. 
   - Use the pre-filled mock credentials (`Username: admin`, `Password: password`) to sign in.
   - The header will now display a personalized User Avatar, which you can click to sign out.

2. **Localization & Theme**
   - In the header, toggle the language dropdown (`EN` / `ES`) to instantly translate the entire dashboard.
   - Click the Sun/Moon icon to toggle between light and dark themes.

3. **Curating Preferences**
   - Navigate to **Preferences (Settings)** in the sidebar.
   - Toggle topics like *Technology, Sports, or Entertainment*. (Redux Persist instantly saves these to your local storage).
   - Return to **My Feed** (Home). The NewsAPI and TMDB API will dynamically fetch real data matching *only* those selected categories.

4. **Real-Time Data Feed**
   - Stay on the **My Feed** page for a few seconds. The application is actively polling the HackerNews API. The moment a new story is submitted globally, a "Real-time update" card will slide in at the top of your feed!

5. **Interacting with Content**
   - **Drag-and-Drop**: Click and hold any content card to seamlessly drag and drop it into a new position in the feed (powered by Framer Motion).
   - **Favorites**: Click the heart icon on any card. Navigate to the **Favorites** tab in the sidebar to see your saved content.
   - **Search**: Type in the top search bar to instantly filter the feed by title or description.
   - **Call-to-Action**: Click "Read More" / "Play Now" to open the original external URL, or click the Share icon to copy the link directly to your clipboard.

---

## 🧪 Testing

The project includes comprehensive testing setups.

**Unit Tests (Jest):**
Tests the core Redux reducers and logic without requiring the UI.
```bash
npm run test
```

**End-to-End Tests (Cypress):**
Tests the actual user interface flow. Make sure the development server is running (`npm run dev`) in a separate terminal before running:
```bash
npm run test:e2e
```
Or to open the Cypress test runner visually:
```bash
npm run cypress:open
```
