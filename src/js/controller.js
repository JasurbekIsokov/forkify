const { async } = require('regenerator-runtime');

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.loadingSpinner();

    await model.loadRecipe(id);

    const data = model.state.recipe;

    recipeView.render(data);
  } catch (err) {
    recipeView.setError();
    throw err;
  }
};

const searchController = async function () {
  try {
    const inputValue = searchView.getQuery();

    await model.searchResults(inputValue);

    const data = model.paginationLogic();

    paginationView.render(model.state.search);

    resultsView.render(data);
  } catch (err) {
    searchView.setError();
    throw err;
  }
};

const paginationController = async function (n) {
  try {
    if (n === 1) {
      ++model.state.search.page;
    } else {
      --model.state.search.page;
    }
    const data = model.paginationLogic();
    paginationView.render(model.state.search);
    resultsView.render(data);
  } catch (err) {
    throw err;
  }
};

paginationView.addHandlerEvent(paginationController);

searchView.addHandlerEvent(searchController);

recipeView.addHandlerEvent(showRecipe);

// controller ichidagi funksiyani view ga berish usuli
// shu usulda malumot berib yuborsak boladi
