# ✅ Transaction Filter & Sort React App

A React application that displays and filters a list of transactions with sorting based on URL parameters. Sorting supports amount and date, with prioritization logic. Filters and sorting options are synced with URL search parameters for deep linking and state persistence.

## 🌐 Live Demo

- 🔗 [Live Demo](https://dvdmsk.github.io/transaction-filter/)
- 📎 Fully integrated filtering and sorting with URL synchronization

## 📦 Repository

- 📁 [GitHub Repo](https://github.com/dvdmsk/transaction-filter.git)

## 🛠️ Technologies Used

- **React (Function Components + Hooks)** — for UI and state management
- **TypeScript** — type safety and autocompletion
- **React Router (useSearchParams)** — URL query parameters handling
- **React Bootstrap** — UI components and styling
- **Context API** — global filter state management
- **Date parsing with native JS Date** — sorting by ISO 8601 date strings
- **ESLint & Prettier** — code quality and formatting

## ✨ Features

- 🎯 **Filtering by amount range and status** — controlled via URL parameters
- 📅 **Sorting by amount and date** — with priority logic and persistence
- 🔄 **URL-synced state** — filters and sorting are stored in query parameters for shareable links and browser history support
- ⚡ **Dynamic updates** — sorting and filtering apply immediately when URL changes
- 🧩 **Separation of concerns** — components for controls, table, and context provider


## 🚀 Getting Started

To run the project locally:

1. **Clone the repository**

    ```bash
    git clone https://github.com/dvdmsk/transaction-filter-sort.git
    cd transaction-filter-sort
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Run the app**

    ```bash
    npm start
    ```

4. **Open in browser**

    Navigate to `http://localhost:3000`

## ✅ UX & Functional Considerations

- Sorting respects priority: if `sortAmount` changes, sorting applies by amount ignoring date sorting; if not, then date sorting applies
- Filters and sorting parameters are validated before applying
- Default sorting and filtering applies when parameters are absent
- State sync with URL enables deep linking and bookmarking filtered/sorted views
- Sorting functions correctly handle ISO date strings (`YYYY-MM-DDTHH:mm:ssZ`) with native JS Date parsing
- Clear user feedback via controls component on current filters and sorting
- Modular code structure for easy maintenance and scalability
