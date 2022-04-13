const { async } = require('regenerator-runtime');

const recipeContainer = document.querySelector('.recipe');

// loadRecipe ni import qildik model faylidan
import { loadRecipe, state } from './model.js';

import recipeView from './views/recipeView.js';

import searchView from './views/searchView.js';

import { searchResults } from './model.js';

import resultsView from './views/resultsView.js';

// Bitta taom retseptini oluvchi funcsiya
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.loadingSpinner();

    await loadRecipe(id);
    const data = state.recipe;

    recipeView.render(data);
  } catch (Error) {
    recipeView.renderError();
    // alert(Error);
  }
};

showRecipe();

const searchController = async function () {
  const inputValue = searchView.getQuery();
  await searchResults(inputValue);

  const data = state.search.results;

  resultsView.render(data);
};

searchView.addHandlerEvent(searchController);

recipeView.addHandlerEvent(showRecipe);
