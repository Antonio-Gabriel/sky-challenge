const APIKEY = '1a97e9fc6e916af0fff2ca4c044a2ef1';

async function fetchMoviesByKeyword(keyword, limit = 5) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${keyword}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const moviesWithImages = data.results.filter(
      (movie) => movie.poster_path !== null,
    );

    return moviesWithImages.slice(0, limit);
  } catch (error) {
    console.error(`Erro ao buscar filmes para a keyword ${keyword}:`, error);
  }
}

async function fetchNowPlayingMovies(limit = 5) {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=pt-BR&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const moviesWithImages = data.results.filter(
      (movie) => movie.poster_path !== null,
    );

    return moviesWithImages.slice(0, limit);
  } catch (error) {
    console.error(`Erro ao buscar lançamentos:`, error);
  }
}
