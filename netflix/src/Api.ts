const API_KEY = "3fadc08fd94e2086a1fc3e574ca59870";

const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

export interface IGetmoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-kr&region=kr`
  ).then((response) => response.json());
};
