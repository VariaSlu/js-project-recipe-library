const recipes = [
  {
    id: 1,
    title: "Vegan Lentil Soup",
    image: "./recipeImg.jpg",
    readyInMinutes: 30,
    servings: 4,
    sourceUrl: "https://example.com/vegan-lentil-soup",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
      "red lentils",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "cumin",
      "paprika",
      "vegetable broth",
      "olive oil",
      "salt"
    ],
    pricePerServing: 2.5,
    popularity: 85
  },
  {
    id: 2,
    title: "Vegetarian Pesto Pasta",
    image: "./recipeImg.jpg",
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: "https://example.com/vegetarian-pesto-pasta",
    diets: ["vegetarian"],
    cuisine: "Italian",
    ingredients: [
      "pasta",
      "basil",
      "parmesan cheese",
      "garlic",
      "pine nuts",
      "olive oil",
      "salt",
      "black pepper"
    ],
    pricePerServing: 3.0,
    popularity: 92
  },
  {
    id: 3,
    title: "Gluten-Free Chicken Stir-Fry",
    image: "./recipeImg.jpg",
    readyInMinutes: 20,
    servings: 3,
    sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    diets: ["gluten-free"],
    cuisine: "Asian",
    ingredients: [
      "chicken breast",
      "broccoli",
      "bell pepper",
      "carrot",
      "soy sauce (gluten-free)",
      "ginger",
      "garlic",
      "sesame oil",
      "cornstarch",
      "green onion",
      "sesame seeds",
      "rice"
    ],
    pricePerServing: 4.0,
    popularity: 78
  },
  {
    id: 4,
    title: "Dairy-Free Tacos",
    image: "./recipeImg.jpg",
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: "https://example.com/dairy-free-tacos",
    diets: ["dairy-free"],
    cuisine: "Mexican",
    ingredients: [
      "corn tortillas",
      "ground beef",
      "taco seasoning",
      "lettuce",
      "tomato",
      "avocado"
    ],
    pricePerServing: 2.8,
    popularity: 88
  },
  {
    id: 5,
    title: "Middle Eastern Hummus",
    image: "./recipeImg.jpg",
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://example.com/middle-eastern-hummus",
    diets: ["vegan", "gluten-free"],
    cuisine: "Middle Eastern",
    ingredients: [
      "chickpeas",
      "tahini",
      "garlic",
      "lemon juice",
      "olive oil"
    ],
    pricePerServing: 1.5,
    popularity: 95
  },
  {
    id: 6,
    title: "Quick Avocado Toast",
    image: "./recipeImg.jpg",
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: "https://example.com/quick-avocado-toast",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
      "bread",
      "avocado",
      "lemon juice",
      "salt"
    ],
    pricePerServing: 2.0,
    popularity: 90
  },
  {
    id: 7,
    title: "Beef Stew",
    image: "./recipeImg.jpg",
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: "https://example.com/beef-stew",
    diets: [],
    cuisine: "European",
    ingredients: [
      "beef chunks",
      "potatoes",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "beef broth",
      "red wine",
      "bay leaves",
      "thyme",
      "salt",
      "black pepper",
      "butter",
      "flour",
      "celery",
      "mushrooms"
    ],
    pricePerServing: 5.5,
    popularity: 80
  }
]

const recipeContainer = document.getElementById("recipe-container");

const displayRecipes = (recipeList) => {
  const container = recipeContainer; // Make sure this matches your HTML
  recipeContainer.innerHTML = ""; // Clear old content

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

// Call the function to display all recipes when the page loads
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
