// Importing necessary hooks from React and the Search component
import { useEffect, useState } from "react";
import Search from "../components/Search";

// Base URL for the TMDB API
const API_URL = "https://api.themoviedb.org/3/discover/movie";
// API key is retrieved from environment variables for security
const API_KEY = import.meta.env.API_TMBD_KEY;
const url_key=import.meta.env.API_KEY

// API options for making requests, including headers for authorization
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  // State to manage the search term entered by the user
  const [SearchTerm, setSearchTerm] = useState("");
  const [catchError, setcatchError] = useState("");

  // Function to fetch movies from the TMDB API
  const fetchingmovies = async () => {
    try {
      // Build the full API URL with API key and sort parameter
      const base_url = `${API_URL}?api_key=7a9cd2a23b5b108504b93f436bd2c3b3&sort_by=popularity.desc`;
      // Call the API using fetch and wait for the response
      const response = await fetch(base_url, API_OPTIONS);
      console.log(response); // Log the response object for debugging
      // If the response is not successful (status code not 200–299)
      if (!response.ok) {
        throw new Error("failed to fetch"); // Throw an error to be caught below
      } else {
        // Convert the response body into JSON format
        const data = await response.json();
        console.log(data); // Log the actual data we got from the API
        // If the API didn't send a proper response field, show an error message
        if (data.response== false) {
          // Set an error message, use message from API if available
          setcatchError(data.error || "failed to fetch movies");
        }
      }
    } catch (error) {
      // If any error occurs in the try block, it will be caught here
      console.log(`Error for Fetching : ${error}`); // Log the error for debugging
      // Show a user-friendly error message on the UI
      setcatchError("error occured while fetching movie try again");
    }
  };

  // useEffect runs once when the component loads (like componentDidMount)
  useEffect(() => {
    // Call the fetchingmovies function to load movies from the API
    fetchingmovies();
  }, []); // Empty dependency array means this runs only once

  return (
    <>
      <main>
        {/* Decorative pattern */}
        <div className="pattern" />
        <div className="wrapper">
          <header className="">
            <h1>
              {/* Hero image and main heading */}
              <img src="/hero.png" alt="" />
              Find <span className="text-gradient">Movies</span> that you'll
              enjoy without the hassle
            </h1>
            <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm} />
            <h1 className="text-white text-sm"> {SearchTerm} </h1>
          </header>
          <section className="all-movies">
            <h2>ALL MOVIES</h2>
            {catchError && <p className="text-red-400">{catchError}</p>}
          </section>
          {/* Search component to handle user input for movie search */}
          {/* Displaying the current search term for debugging or user feedback */}
        </div>
      </main>
    </>
  );
}

export default App;
