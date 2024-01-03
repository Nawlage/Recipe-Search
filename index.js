const apiID = '28c908d7';
const apiKey = 'd15a222d62651311bf7015296f51a851';
const searchInput = $('#search-input');
const searchButton = $('#search-button');
const searchResults = $('#search-results');

searchButton.on('click', function(e) {
    e.preventDefault();
    searchRecipes();

});

// Enter key
searchInput.on('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        searchRecipes();
    }
});

async function searchRecipes() {
    const query = searchInput.val().trim();
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${apiID}&app_key=${apiKey}&from=0&to=9`);
    const data = await response.json();
    console.log(data);
    displayRecipes(data);
}

function displayRecipes(data) {
    searchResults.empty();

    data.hits.forEach(hit => {
        const recipe = hit.recipe;

        // Create col div
        const recipeElement = $('<div>').addClass('col');

        // Create card div
        const card = $('<div>').addClass('card shadow-sm');
        recipeElement.append(card);

        // Create and append image
        const img = $('<img>').attr('src', recipe.image).attr('alt', 'Recipe image').attr('height', '210px').attr('width', '100%');
        card.append(img);

        // Create card body
        const cardBody = $('<div>').addClass('card-body');
        card.append(cardBody);

        // Create and append title
        const h5 = $('<h5>').addClass('card-title').text(recipe.label);
        cardBody.append(h5);
        
        // Create and append ingredients list
        const p = $('<p>').addClass('card-text').text(recipe.ingredientLines.join(', '));
        cardBody.append(p);

        // Create button group
        const btnGroup = $('<div>').addClass('btn-group');
        const button = $('<button>').attr('type', 'button').addClass('btn btn-sm btn-outline-secondary').text('Link to recipe').click(function() {
            window.open(recipe.url, '_blank');
        });
        btnGroup.append(button);

        // Create flex div
        const flexDiv = $('<div>').addClass('d-flex justify-content-between align-items-center');
        flexDiv.append(btnGroup);
        cardBody.append(flexDiv);

        // Append col to search results
        searchResults.append(recipeElement);
    });
}