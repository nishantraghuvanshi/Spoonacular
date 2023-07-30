const recipeForm = document.getElementById('recipeForm');
const recipeResults = document.getElementById('recipeResults');

recipeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const cuisine = document.getElementById('cuisine').value;
  const diet = document.getElementById('diet').value;
  const type = document.getElementById('type').value;

  fetchRecipes(cuisine, diet, type);
});

function fetchRecipes(cuisine, diet, type) {
  const apiKey = 'ecec383e6e8e4b9a87ec1bfcf508c31f ';
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${diet}&type=${type}&number=5&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayRecipes(data.results))
    .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
  recipeResults.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const img = document.createElement('img');
    img.src = recipe.image;
    img.alt = recipe.title;
    recipeCard.appendChild(img);

    const heading = document.createElement('h3');
    heading.textContent = recipe.title;
    recipeCard.appendChild(heading);

    const ingredientsList = document.createElement('ul');
    recipe.extendedIngredients.forEach(ingredient => {
      const listItem = document.createElement('li');
      listItem.textContent = ingredient.original;
      ingredientsList.appendChild(listItem);
    });
    recipeCard.appendChild(ingredientsList);

    recipeResults.appendChild(recipeCard);
  });
}
