const API_KEY = "3fadc08fd94e2086a1fc3e574ca59870";

const BASE_PATH = "https://api.themoviedb.org/3";

export const getMovies = () => {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

// https://api.themoviedb.org/3/movie/now_playing?api_key=3fadc08fd94e2086a1fc3e574ca59870

// https://api.themoviedb.org/3/movie/now_playing?language=ko-kr&page=1&region=kr?api_key=3fadc08fd94e2086a1fc3e574ca59870
