const { async } = require('regenerator-runtime');

import icons from '../img/icons.svg'; // Parcel1 parcelning 1-usuli
// import icons from "url:../img/icons.svg" // Parcel2 parcelning 2-usulu

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Bitta taom retseptini oluvchi funcsiya
const showRecipe = async function () {
  const data = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
  );
  const dataJSON = await data.json();
  const obj = dataJSON.data.recipe;

  // Malumotlarni saqlovchi obect.
  const state = {
    id: obj.id,
    image: obj.image_url,
    publisher: obj.publisher,
    ingredients: obj.ingredients,
    title: obj.title,
    servings: obj.servings,
    url: obj.source_url,
    time: obj.cooking_time,
  };
};

showRecipe();

// O'ng tomondagi malumotlarni render qilib chiqaruvch function
