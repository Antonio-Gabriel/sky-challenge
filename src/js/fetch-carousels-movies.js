function getBannerSplideInstanceByName(splideName) {
  let bannerSplide = splideName === 'banner' ? null : [];
  const movieSlides = document.querySelectorAll('.movies-slides');

  const spliedOptions = {
    banner: {
      type: 'loop',
      perPage: 3,
      focus: 'center',
      autoplay: true,
      interval: 3000,
      padding: '0.5rem',
    },
    movies: {
      type: 'loop',
      perPage: 7,
      perMove: 1,
      breakpoints: {
        1200: {
          perPage: 5,
        },
        768: {
          perPage: 4,
        },
        480: {
          perPage: 3,
        },
      },
      arrows: false,
      pagination: false,
    },
  };

  if (splideName == 'banner') {
    bannerSplide = initializeSplide('.banner', spliedOptions.banner);
  } else {
    movieSlides.forEach((slide) => {
      bannerSplide.push(initializeSplide(slide, spliedOptions.movies));
    });
  }

  return bannerSplide;
}

function getBannerTemplateByName(splideName, movie) {
  if (splideName == 'banner') {
    return `
        <li class="splide__slide">
            <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                alt="${movie.title}"
                class="lazy-load"
            />
        </li>
    `;
  }

  return `
     <li class="splide__slide">
        <div class="slide-content">
            <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                alt="${movie.title}"
            />
            <div class="cart-icon">
                <img
                    src="/src/assets/img/shopping-cart-11.png"
                    alt="shopping cart icon"
                />
            </div>
        </div>
    </li>
  `;
}

function renderCarousel(movies, carouselId, splideClassName = 'banner') {
  const $carousel = $(`#${carouselId}`);

  $carousel.empty();

  let bannerSplide = getBannerSplideInstanceByName(splideClassName);

  movies.forEach((movie) => {
    const movieHtml = getBannerTemplateByName(splideClassName, movie);

    $carousel.append(movieHtml);

    if (Array.isArray(bannerSplide)) {
      bannerSplide.forEach((splide) => splide.refresh());
    } else {
      bannerSplide.refresh();
    }
  });
}

async function loadMainCarousel() {
  const terrorMovies = await fetchNowPlayingMovies(5);
  renderCarousel(terrorMovies, 'banner-header');
}

function loadOtherCarousels() {
  fetchMoviesByKeyword('terror', 15).then((movies) =>
    renderCarousel(movies, 'science', 'movies'),
  );

  fetchMoviesByKeyword('DC Comics', 15).then((movies) =>
    renderCarousel(movies, 'comic', 'movies'),
  );

  fetchMoviesByKeyword('Brazil', 15).then((movies) =>
    renderCarousel(movies, 'nacional', 'movies'),
  );

  fetchMoviesByKeyword('Marvel', 15).then((movies) =>
    renderCarousel(movies, 'marvel', 'movies'),
  );
}

async function loadCarousels() {
  await loadMainCarousel();
  loadOtherCarousels();
}

$(document).ready(function () {
  loadCarousels();
});
