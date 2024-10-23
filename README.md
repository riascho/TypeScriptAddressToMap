# TypeScript Project - Address to Map

This project is a simple web application that allows users to enter an address, search for it using the Google Maps API, and display the location on a map with a marker. The application is built using `TypeScript` and bundled with `Webpack`.

Built for the [Unterstanding Typescript Course](https://www.udemy.com/course/understanding-typescript) on Udemy.

![Demo](<CleanShot 2024-10-23 at 20.11.42.gif>)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/riascho/TypeScriptAddressToMap.git
   cd TypeScriptAddressToMap
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Enter your Google API Key:**

   - Obtain your API key from the [Google Maps API](https://developers.google.com/maps/documentation/geocoding/get-api-key).
   - Replace `YOUR_API_KEY` in the `src/app.ts` and `index.html` files with your actual API key.

4. **Start the development server:**
   ```bash
   npm start
   ```

## Packages and Libraries Used

- **TypeScript:** A strongly typed programming language that builds on JavaScript.
- **Webpack:** A module bundler to bundle JavaScript files for usage in a browser.
- **Axios:** A promise-based HTTP client for making requests to the Google Maps API.
- **@types/googlemaps:** TypeScript type definitions for the Google Maps JavaScript API, providing type safety and autocompletion features when working with the Google Maps API in TypeScript.
