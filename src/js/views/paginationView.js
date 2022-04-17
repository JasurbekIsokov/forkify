import icons from '../../img/icons.svg'; // Parcel 1-versiya

class PaginationView {
  #parentElement = document.querySelector('.pagination');
  #data;

  render(data) {
    this.#data = data;
    this.#generateHtml();
  }
  addHandlerEvent(handle) {
    this.#parentElement.addEventListener('click', function (e) {
      if (e.target.closest('.pagination__btn--next')) {
        handle(1);
      }
      if (e.target.closest('.pagination__btn--prev')) {
        handle(2);
      }
    });
  }
  #generateHtml() {
    const currentPage = this.#data.page;
    const endPage = Math.ceil(this.#data.results.length / this.#data.perPage);

    this.#parentElement.innerHTML = '';
    const btnPrev = `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}.svg#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;

    const btnNext = `<button class="btn--inline pagination__btn--next">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}.svg#icon-arrow-right"></use>
    </svg>
  </button>`;
    if (currentPage > 1) {
      this.#parentElement.insertAdjacentHTML('afterbegin', btnPrev);
    }
    if (endPage > currentPage) {
      this.#parentElement.insertAdjacentHTML('beforeend', btnNext);
    }
  }
}

export default new PaginationView();
