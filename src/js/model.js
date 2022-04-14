import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: {},
    page: 1,
    perPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(API_URL + id);
    const obj = data.data.recipe;

    // Malumotlarni saqlovchi obect.
    state.recipe = {
      id: obj.id,
      image: obj.image_url,
      publisher: obj.publisher,
      ingredients: obj.ingredients,
      title: obj.title,
      servings: obj.servings,
      url: obj.source_url,
      time: obj.cooking_time,
    };
  } catch (Error) {
    throw Error;
  }
};

export const searchResults = async function (searchKey) {
  try {
    const data = await getJSON(API_URL + `?search=${searchKey}`);
    console.log(data);

    const getArr = data.data.recipes;

    state.search.query = searchKey;

    state.search.results = getArr.map(val => {
      return {
        id: val.id,
        image: val.image_url,
        publisher: val.publisher,
        title: val.title,
      };
    });

    console.log(state.search.results);
  } catch (error) {
    throw error;
  }
};

export const paginationLogic = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.perPage;
  const and = page * state.search.perPage;

  return state.search.results.slice(start, and);
};
