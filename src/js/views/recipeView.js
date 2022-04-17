// iconni img papkadan import qildik
import icons from '../../img/icons.svg'; // Parcel1 parcelning 1-usuli
// import icons from "url:../img/icons.svg" // Parcel2 parcelning 2-usulu

class RecipeView {
  #errorMessage =
    'Siz qidirayotgan malumot tpilmadi. Iltimos qayta urinib koring!';

  #parentElement = document.querySelector('.recipe');
  #data;
  render(data) {
    this.#data = data;

    this.#clearHtml();
    this.#generateHtml();
  }

  #clearHtml() {
    this.#parentElement.innerHTML = '';
  }

  loadingSpinner() {
    const html = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    this.#clearHtml();
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }

  addHandlerEvent(data) {
    // url o'zgarganda ishlab ketishi uchun
    //window.addEventListener('hashchange', showRecipe); // url o'zgarganda uni olib showRecipe ga berib yubordik
    //window.addEventListener('load', showRecipe); // url bor bo'lsa uni chiqarish uchun showRecipe berish

    // ikki marta addEventListener qilmaslik uchun forda aylantiramiz
    ['hashchange', 'load'].forEach(val => {
      window.addEventListener(val, data);
    });
  }

  // Pilus minus

  addHandleServing(handle) {
    this.#parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;

      const servingsNum = +btn.getAttribute('id');

      if (servingsNum >= 1) {
        handle(servingsNum);
      }
      // console.log(btn);
      console.log(servingsNum);
    });
  }

  addHandleBookmark(handle) {
    this.#parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--round');
      if (!btn) return;

      console.log(btn);
      handle();
    });
  }

  renderError() {
    const html = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${this.#errorMessage}!</p>
  </div>`;

    this.#clearHtml();
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }

  // ingredientlarni render qilib asosiy render functionga beruvchi function
  #renderIng(ings) {
    return ings.map(val => {
      return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${val.quantity ? val.quantity : ''}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${val.unit}</span>
      ${val.description}
    </div>
  </li>
`;
    });
  }

  // O'ng tomondagi malumotlarni render qilib chiqaruvch function
  #generateHtml() {
    const html = `<figure class="recipe__fig">
  <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
  <h1 class="recipe__title">
    <span>${this.#data.title}</span>
  </h1>
</figure>

<div class="recipe__details">
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${
      this.#data.time
    }</span>
    <span class="recipe__info-text">minutes</span>
  </div>
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${
      this.#data.servings
    }</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--increase-servings" id=${
        this.#data.servings - 1
      }>
        <svg>
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>
      <button class="btn--tiny btn--increase-servings" id=${
        this.#data.servings + 1
      }>
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="recipe__user-generated">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
  <button class="btn--round">
    <svg class="">
      <use href="${icons}#icon-bookmark${
      this.#data.bookmarked ? '-fill' : ''
    }"></use>
    </svg>
  </button>
</div>

<div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">

  ${this.#renderIng(this.#data.ingredients).join('')}

  </ul>
</div>

<div class="recipe__directions">
  <h2 class="heading--2">How to cook it</h2>
  <p class="recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__publisher">${
      this.#data.publisher
    }</span>. Please check out
    directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href="${this.#data.url}"
    target="_blank"
  >
    <span>Directions</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </a>
</div>`;

    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }
}

export default new RecipeView();
