const URL = "https://api.spoonacular.com/recipes/random?number=10&apiKey=53a1b8b25d3f487abec3fc6a0e02776e"

fetch(URL)
  .then(response => response.json())
  .then(data => {
    recipes = data.recipes
    console.log(recipes)
  })
  .catch(error => {
    console.log(error)
  })

const recipeContainer = document.getElementById("recipe-container");

const displayRecipes = (recipeList) => {
  const container = recipeContainer;
  recipeContainer.innerHTML = "";

  if (recipeList.length === 0) {
    document.getElementById("no-results-message").style.display = "block";
    return;
  } else {
    document.getElementById("no-results-message").style.display = "none";
  }

  recipeList.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">  
      <h2>${recipe.title}</h2>
      <p>Time: ${recipe.readyInMinutes} min</p>
      <p>Servings: ${recipe.servings}</p>
      <p>Cuisine: ${recipe.cuisine}</p>
      <p>Ingridients: ${recipe.ingredients}</p>
      <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
    `;
    container.appendChild(recipeCard);
  });
};


displayRecipes(recipes);


const filterAndSortRecipes = () => {
  const selectedDiet = document.getElementById("diet-filter").value;
  const selectedSort = document.getElementById("sort-options").value;

  let filteredRecipes = [...recipes];

  if (selectedDiet !== "all") {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes(selectedDiet));
  }

  // Sorting logic
  if (selectedSort === "time") {
    filteredRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  } else if (selectedSort === "ingredients") {
    filteredRecipes.sort((a, b) => a.ingredients.length - b.ingredients.length);
  } else if (selectedSort === "popularity") {
    filteredRecipes.sort((a, b) => b.popularity - a.popularity);
  }

  displayRecipes(filteredRecipes);
};

// Event Listeners
document.getElementById("diet-filter").addEventListener("change", filterAndSortRecipes);
document.getElementById("sort-options").addEventListener("change", filterAndSortRecipes);
