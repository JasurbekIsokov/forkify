const { async } = require('regenerator-runtime');

const recipeContainer = document.querySelector('.recipe');

// loadRecipe ni import qildik model faylidan
import { loadRecipe, state } from './model.js';

import { paginationLogic } from './model.js';

import recipeView from './views/recipeView.js';

import searchView from './views/searchView.js';

import { searchResults } from './model.js';

import resultsView from './views/resultsView.js';
import { result } from 'lodash';

import paginationView from './views/paginationView.js';

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
    recipeView.renderError(); // error berganda biz belgilagan yozuv ekranga chiqishi
    // alert(Error);
  }
};

showRecipe();

// search qilganda ishlashi kerak bo'lgan function.
const searchController = async function () {
  try {
    const inputValue = searchView.getQuery();
    await searchResults(inputValue);

    // const data = state.search.results;

    const data = paginationLogic(2);
    console.log(data);
    resultsView.render(data);
    paginationView.render(state.search.page);
  } catch (er) {
    throw er;
  }
};

// serachView dagi functionni chaqirdik va unga argument sifatida controller.js
// fayldagi functionni berib yubordik
searchView.addHandlerEvent(searchController);

recipeView.addHandlerEvent(showRecipe);

const paginationController = async function () {
  try {
    const data = paginationLogic();
    resultsView.render(data);
  } catch (er) {
    alert(er);
  }
};
