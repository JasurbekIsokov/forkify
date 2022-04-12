const { async } = require('regenerator-runtime');

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
  console.log(dataJSON);

  const obj = dataJSON.data.recipe;
  console.log(obj);
};

showRecipe();
