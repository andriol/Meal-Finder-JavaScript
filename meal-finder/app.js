const search = document.getElementById("search");
const form = document.getElementById("submit");
const resultHeading = document.getElementById("result-heading");
const searchBtn = document.querySelector(".search-btn");
const singleMeal = document.getElementById("single-meal");
const meals = document.getElementById("meals");
form.addEventListener("submit", getRecipe);

function getRecipe(e) {
  e.preventDefault();
  const searchValue = search.value;
  if (searchValue.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.meals);
        resultHeading.innerHTML = `<h2>Search results for "${searchValue}"</h2>`;
        if (res.meals === null) {
          resultHeading.innerHTML = `<h3>There no results for this recipe! Please try another recipe!`;
        } else {
          meals.innerHTML = res.meals
            .map(
              (meal) =>
                `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}
