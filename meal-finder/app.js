const search = document.getElementById("search");
const form = document.getElementById("submit");
const resultHeading = document.getElementById("result-heading");
const singleMeal = document.getElementById("single-meal");
const meals = document.getElementById("meals");
const randomBtn = document.getElementById("random");

form.addEventListener("submit", getRecipe);
randomBtn.addEventListener("click", getRandom);

function getRecipe(e) {
  e.preventDefault();
  singleMeal.innerHTML = "";
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
    alert("Please fill in the search box.");
  }
}

function getRandom() {
  resultHeading.innerHTML = "";
  meals.innerHTML = "";
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      const meal = res.meals[0];
      recipeDOM(meal);
    });
}

function recipeDOM(meal) {
  const ingredients = [];
  console.log(ingredients);
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMeal.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
           ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}
