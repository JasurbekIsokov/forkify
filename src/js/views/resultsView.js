import icons from '../../img/icons.svg';

class ResultsView {
  #parentElement = document.querySelector('.results');

  #data;

  render(data) {
    this.#data = data;
    console.log(data);

    this.#clearHtml();
    this.#data.map(data => {
      this.#generateHtml(data);
    });
  }

  #clearHtml() {
    this.#parentElement.innerHTML = '';
  }
  #generateHtml(obj) {
    let html = `
    <li class="preview">
            <a class="preview__link preview__link--active" href="#${obj.id}">
              <figure class="preview__fig">
                <img src="${obj.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${obj.title}</h4>
                <p class="preview__publisher">${obj.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;

    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }
}

export default new ResultsView();
