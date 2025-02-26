document.addEventListener("DOMContentLoaded", function () {
  const dietFilter = document.getElementById("diet");
  const sortFilter = document.getElementById("sort");
  const recipes = document.querySelectorAll(".recipe-card");

  function filterAndSort() {
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

      if (selectedSort === "time") {
        return timeA - timeB;
      }
      return 0; // Placeholder for other sorting options
    });

    // Hide all and show only filtered
    recipes.forEach(recipe => recipe.style.display = "none");
    filteredRecipes.forEach(recipe => recipe.style.display = "block");
  }

  dietFilter.addEventListener("change", filterAndSort);
  sortFilter.addEventListener("change", filterAndSort);
});

