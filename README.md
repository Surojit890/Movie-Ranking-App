# Movie Ranking App

A modern React-based movie discovery application that allows users to search for movies, view trending films, and track search analytics using TMDB API and Appwrite backend.

## ✨ Features

- **Movie Search**: Search for movies with debounced input to optimize API calls
- **Trending Movies**: View popular and trending movies from TMDB
- **Search Analytics**: Track search terms and their frequency using Appwrite database
- **Responsive Design**: Beautiful UI with Tailwind CSS and custom styling
- **Real-time Data**: Live movie data from The Movie Database (TMDB)
- **Performance Optimized**: Debounced search, lazy loading, and optimized API calls

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Custom CSS
- **API**: TMDB (The Movie Database) API
- **Backend**: Appwrite (Database, Authentication)
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TMDB API Key
- Appwrite account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Surojit890/Movie-Ranking-App.git
   cd Movie-Ranking-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_ENDPOINT=https://your-appwrite-endpoint.com/v1
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   ```

4. **Get your TMDB API Key**
   - Go to [TMDB API](https://www.themoviedb.org/settings/api)
   - Create an account and request an API key
   - Copy your API Read Access Token

5. **Set up Appwrite**
   - Create an account at [Appwrite Cloud](https://cloud.appwrite.io)
   - Create a new project
   - Create a database and collection for search analytics
   - Add your project details to the `.env.local` file
   - Configure web platform with your domain (e.g., `http://localhost:5173`)

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the app in action!

## 📱 How to Use

### Search for Movies
1. Type a movie name in the search bar
2. The app will automatically search as you type (debounced for performance)
3. Browse through the search results
4. Each search is tracked in the analytics database

### View Trending Movies
1. When you first load the app, you'll see popular movies
2. Scroll through the movie cards to explore trending films
3. Each movie card shows:
   - Movie poster
   - Title
   - Rating
   - Release year
   - Original language

### Movie Information
Each movie card displays:
- **Poster**: High-quality movie poster from TMDB
- **Title**: Official movie title
- **Rating**: TMDB user rating (out of 10)
- **Year**: Release year
- **Language**: Original language of the film

## 🔧 Configuration

### TMDB API Setup
1. Visit [TMDB API Documentation](https://developers.themoviedb.org/3)
2. Register for an API key
3. Use the "Read Access Token" (Bearer token) in your environment variables

### Appwrite Setup
1. Create a new project in Appwrite
2. Set up a database with a collection for search analytics
3. Configure the collection with these attributes:
   - `searchTerm` (string)
   - `count` (integer)
   - `movie_id` (integer)
   - `poster_url` (string)

## 📁 Project Structure

```
Movie-Ranking-App/
├── public/
│   ├── hero.png
│   ├── BG.png
│   └── ...
├── src/
│   ├── components/
│   │   ├── search.jsx
│   │   ├── spinner.jsx
│   │   └── moviecard.jsx
│   ├── lib/
│   │   └── appwrite.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

