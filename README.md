# 🎧 React Podcast Browser | DSJ04 Project

## 📌 Project Overview

The **React Podcast Browser** is a responsive web app that displays podcast previews in a clean grid layout.  
It fetches live data from a public **Podcast API**, shows **loading**, **error**, and **empty** states, and provides multiple user-friendly filters — including **search**, **genre filter**, **sorting**, and **pagination**.  
The project demonstrates modern React hooks (`useState`, `useEffect`, `useMemo`, `useReducer`), modular architecture, and accessibility-aware UI.

---

## 🚀 Features

- 🔍 **Search** podcasts by title (updates dynamically as you type)
- 🗂️ **Genre Filter** using dropdown (filters by specific categories)
- 🔄 **Sort Options**
  - Newest first (based on last updated date)
  - Title A–Z
  - Title Z–A
- 📑 **Numbered Pagination** that remembers filters and search state
- 🔗 **URL State Synchronisation** — keeps search, filter, and page selections even after refresh
- 🧩 **Reusable Components**: `PodcastCard`, `PodcastGrid`, `GenreFilter`, `SearchBar`, `SortSelect`, `Pagination`
- ⚙️ **Data Fetch Service** (`src/services/podcasts.js`) — cleanly separated from UI
- 🔢 **Number of seasons** shown per podcast
- 📱 Fully **responsive** grid layout (mobile → desktop)
- 📝 **JSDoc-style** headers across components and utilities
- ♿ **Accessible** semantics, alt text, and focus states
- 🌞 **Light theme by default** (tokens in `src/styles/theme.css`)

---

## 🛠️ Technologies Used

- **React 18** (Vite + ES modules)
- **Vite** dev server & build tools
- **CSS Grid / Flexbox**
- **JavaScript (ES2020+)**
- **JSDoc** documentation style

---

## 🧩 How It Works

1. On load, the app **fetches podcasts** from the API.
2. While loading, a “Loading podcasts…” message is displayed.
3. If the request fails, an **error state** is shown.
4. Once loaded:
   - The list of podcasts appears in a responsive grid.
   - Users can search by title, filter by genre, and sort results.
   - **Numbered pagination** ensures smooth browsing without data resets.
5. Each podcast card displays:
   - 🎧 **Title**
   - 🔢 **Number of seasons**
   - 🏷️ **Genre name**
   - 📅 **Last updated date**
   - 🖼️ **Cover image**

---

💡 Usage Examples

Try out these quick interactions to explore the app’s functionality:

Search: Type “history” in the search bar → only podcasts with “history” in the title appear instantly.

Sort: Switch the sort dropdown to “Title (A–Z)” → the list reorders alphabetically without losing your filters.

Filter: Choose “Comedy” from the genre dropdown → only comedy podcasts show, with pagination intact.

Pagination: Click through numbered pages → results and filters persist while browsing.

State Persistence: Refresh the page → your current search, genre, and sort selections remain saved in the URL.

Each of these demonstrates real-time synchronization between search, sort, filter, and pagination — key DSJ04 learning outcomes.

## ⚙️ Setup Instructions

1. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
2. Open the printed local URL (usually `http://localhost:5173`).

### 🧪 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview the production build
```

---

## 🗂️ Folder Structure

```
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles/
│   │   ├── theme.css
│   │   └── styles.css
│   ├── data/
│   │   └── genres.js
│   ├── context/
│   │   └── FiltersContext.jsx
│   ├── hooks/
│   │   ├── useDebouncedValue.js
│   │   └── useQuerySync.js
│   ├── utils/
│   │   ├── paginate.js
│   │   └── sorters.js
│   ├── services/
│   │   └── podcasts.js
│   └── components/
│       ├── PodcastCard.jsx
│       ├── PodcastGrid.jsx
│       ├── SearchBar.jsx
│       ├── SortSelect.jsx
│       ├── GenreFilter.jsx
│       └── Pagination.jsx
```

---

## 🔌 API Reference

- **Base URL:** `https://podcast-api.netlify.app`
- **Endpoints:** `/` (list), `/id/:id` (optional detail)

---

## ♿ Accessibility Notes

- Descriptive `alt` text for podcast artwork
- Focus-visible outlines for all interactive elements
- High-contrast, readable **light** theme

---

## 👤 Author

**Vanessa Baart**  
GitHub: https://github.com/VanessaDa  
LinkedIn: https://www.linkedin.com/in/vanessa-gwama-50841ab7

---

## 📎 Notes

This project forms part of the CodeSpace Academy **React (DSJ04)** module.  
Focus areas: data fetching, state management, dynamic filtering/sorting/pagination, separated services, and accessible responsive UI.
