class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const val = document.querySelector('.search__field').value; // search inputdagi user kiritgan value
    return val;
  }

  // controller.js dagi functionni logica yo'li bilan viewda ishlatdik
  // Publisher - subscribe pattern
  addHandlerEvent(handle) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handle(); // controller.js dagi function(searchController)
    });
  }
}

export default new SearchView();
