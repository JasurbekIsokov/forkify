class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const val = document.querySelector('.search__field').value;
    return val;
  }

  addHandlerEvent(handle) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handle();
    });
  }
}

export default new SearchView();
