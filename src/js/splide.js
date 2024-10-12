function initializeSplide(slideSelector, options) {
  const splideInstance = new Splide(slideSelector, options);
  splideInstance.mount();
  return splideInstance;
}
