/* document.addEventListener("DOMContentLoaded", () => {
  const dietFilter = document.getElementById("diet");
  const sortFilter = document.getElementById("sort");
  const recipes = document.querySelectorAll(".recipe-card");

  const filterAndSort = () => {
    const selectedDiet = dietFilter.value;
    const selectedSort = sortFilter.value;

    let filteredRecipes = Array.from(recipes);

    // Filter by diet
    if (selectedDiet !== "all") {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.dataset.diet === selectedDiet);
    }

    // Sort recipes
    filteredRecipes.sort((a, b) => {
      const timeA = parseInt(a.dataset.time);
      const timeB = parseInt(b.dataset.time);
      return selectedSort === "time" ? timeA - timeB : 0;
    });

    // Hide all and show only filtered
    recipes.forEach(recipe => (recipe.style.display = "none"));
    filteredRecipes.forEach(recipe => (recipe.style.display = "block"));
  };

  dietFilter.addEventListener("change", filterAndSort);
  sortFilter.addEventListener("change", filterAndSort);
});
*/

const updateDietMessage = () => {
  const selectedDiet = document.getElementById("diet").value;
  const messageElement = document.getElementById("diet-message");

  let message = "";

  if (selectedDiet === "vegan") {
    message = "You chose Vegan! Try our delicious AvoToast.🥑"
  } else if (selectedDiet === "vegetarian") {
    message = "You chose Vegetarian! How about a cheesy Margerita Pizza?🍕"
  } else if (selectedDiet === "gluten-free") {
    message = "You chose Gluten-free! Our Quinoa Salad is perfect for you🥗"
  } else if (selectedDiet === "dairy-free") {
    message = "You chose Dairy-free! Enjoy a refreshing Coconut Smoothie🥥"
  } else {
    message = "Explore all our delicious recipes 🙂"
  }

  messageElement.textContent = message;
};

document.getElementById("diet").addEventListener("change", updateDietMessage);