import icons from '../../img/icons.svg'; // Parcel1 parcelning 1-usuli

class PaginationView {
  #parentElement = document.querySelector('.pagination');

  #data;

  render(data) {
    this.#data = data;
  }

  addHandlerEvent(handle) {
    this.#parentElement.addEventListener('click', function (e) {
      if (e.target.closest('.btn--inline')) {
        handle();
      }
    });
  }

  #generateHtml() {
    const currentPage = this.#data.page;
    const endpage = Math.ceil(this.#data.results.length / this.#data.perPage);

    const btnPre = `
    <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page 1</span>
  </button>`;

    const btnNext = `
    <button class="btn--inline pagination__btn--next">
    <span>Page 3</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;

    if (currentPage > 1) {
      this.#parentElement.innerHTML = '';
      this.#parentElement.insertAdjacentHTML('afterbegin', btnPre);
    }

    if (endpage > currentPage) {
      this.#parentElement.innerHTML = '';
      this.#parentElement.insertAdjacentHTML('afterbegin', btnNext);
    }
  }
}

export default new PaginationView();
