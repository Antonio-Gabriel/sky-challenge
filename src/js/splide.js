document.addEventListener('DOMContentLoaded', function () {
  const splide = new Splide('.banner', {
    type: 'loop',
    perPage: 3,
    focus: 'center',
    autoplay: true,
    interval: 3000,
    padding: '0.5rem',
  });

  splide.mount();

  const movieSlides = document.querySelectorAll('.movies-slides');

  const splideOptions = {
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
  };

  movieSlides.forEach((slide) => {
    new Splide(slide, splideOptions).mount();
  });

  // const moviesSlides = new Splide('.movies-slides2', {
  //   type: 'loop',
  //   perPage: 7,
  //   perMove: 1,
  //   breakpoints: {
  //     1200: {
  //       perPage: 5,
  //     },
  //     768: {
  //       perPage: 4,
  //     },
  //     480: {
  //       perPage: 3,
  //     },
  //   },
  //   arrows: false,
  //   pagination: false,
  // });

  // moviesSlides.mount();
});
