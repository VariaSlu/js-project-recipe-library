const API_KEY = "53a1b8b25d3f487abec3fc6a0e02776e";
const URL = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`;
const recipeContainer = document.getElementById("recipe-container");
let allRecipes = [];


const fetchRecipes = async () => {
  try {
    document.getElementById("recipe-container").innerHTML = "Loading rrrrrrecipes...";

    const response = await fetch(URL);
    const data = await response.json();

    console.log("Fetched Data:", data);

    if (data.recipes && data.recipes.length > 0) {
      displayRecipes(data.recipes);
      localStorage.setItem("recipes", JSON.stringify(data.recipes));
    } else {
      document.getElementById("recipe-container").innerHTML =
        "Oops! No recipes found. Try again later.";
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    document.getElementById("recipe-containe").innerHTML =
      "Failed to load recipes. Please try again.";
  }
};



/*const fetchData = () => {
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      recipes = data.recipes
      console.log(recipes)
    })
    .catch(error => {
      console.log(error)
    })
};*/


const displayRecipes = (recipeList) => {
  const container = document.getElementById("recipe-container");
  recipeContainer.innerHTML = "";


  recipeList.forEach((recipe) => {
    const recipeCard = `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h2>${recipe.title}</h2>
        <p><strong>Time:</strong> ${recipe.readyInMinutes} min</p>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Price per Serving:</strong> $${(recipe.pricePerServing / 100).toFixed(2)}</p>
        <p><strong>Cuisine:</strong> ${recipe.cuisines.length > 0 ? recipe.cuisines.join(", ") : "Unknown"}</p>
        <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
      </div>
    `;
    container.innerHTML += recipeCard;
  });
};


const filterRecipes = () => {
  const selectedDiet = document.getElementById("diet-filter").value;
  const selectedCuisine = document.getElementById("cuisine-filter").value;
  const selectedServings = document.getElementById("servings-filter").value;

  let allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

  let filteredRecipes = allRecipes.filter((recipe) => {
    let dietMatch = selectedDiet === "all" || recipe.diets.includes(selectedDiet);
    let cuisineMatch = selectedCuisine === "all" || (recipe.cuisines && recipe.cuisines.includes(selectedCuisine));

    let servingsMatch = false;
    if (selectedServings === "all") {
      servingsMatch = true;
    } else if (selectedServings === "1") {
      servingsMatch = recipe.servings === 1;
    } else if (selectedServings === "2-4") {
      servingsMatch = recipe.servings >= 2 && recipe.servings <= 4;
    } else if (selectedServings === "4+") {
      servingsMatch = recipe.servings > 4;
    }

    return dietMatch && cuisineMatch && servingsMatch;
  });

  displayRecipes(filteredRecipes);
};


document.getElementById("diet-filter").addEventListener("change", filterRecipes);
document.getElementById("cuisine-filter").addEventListener("change", filterRecipes);
document.getElementById("servings-filter").addEventListener("change", filterRecipes);



const sortRecipes = () => {
  const sortBy = document.getElementById("sort-filter").value;
  const allRecepies = JSON.parse(localStorage.getItem("recipes")) || [];

  let sortedRecipes = [...allRecipes];

  if (sortBy === "time") {
    sortedRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  } else if (sortBy === "price") {
    sortedRecipes.sort((a, b) => a.pricePerServing - b.pricePerServing);
  } else if (sortBy === "popularity") {
    sortedRecipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
  }

  displayRecipes(sortedRecipes);
};


document.addEventListener("DOMContentLoaded", () => {
  const cachedRecipes = localStorage.getItem("recipes");
  if (cachedRecipes) {
    console.log("using cached recipes.");
    displayRecipes(JSON.parse(cachedRecipes));
  } else {
    fetchRecipes();

  }
});


const exampleResponse = {
  recipes: [
    {
      id: 644861,
      image: "https://img.spoonacular.com/recipes/644861-556x370.jpg",
      title: "Gluten Free Yellow Cake And Cupcakes",
      readyInMinutes: 45,
      servings: 24,
      pricePerServing: 54.16,
      sourceUrl: "https://www.foodista.com/recipe/4BMVR7W2/gluten-free-yellow-cake-and-cupcakes",
      diets: ["gluten free", "fodmap friendly"],
      extendedIngredients: [{ name: "coconut flour" }, { name: "tapioca flour" }, { name: "salt" }],
    },
  ],
};

if (!localStorage.getItem("recipes")) {
  console.log("API quuota reached, using example rersponse.");
  displayRecipes(exampleResponse.recipes);
}

// Event Listeners>
//document.getElementById("diet-filter").addEventListener("change", filterAndSortRecipes);//
document.getElementById("sort-filter").addEventListener("change", sortRecipes);
document.getElementById("random-recipe-btn").addEventListener("click", fetchRecipes);

