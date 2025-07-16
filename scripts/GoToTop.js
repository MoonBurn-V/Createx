class GoToTop {
  constructor() {
    const goToTopBtn = document.querySelector(".footer__extra-button");

    if (goToTopBtn) {
      goToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}

export default GoToTop;