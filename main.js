console.log('hello sup de vinci');  // ligne de commande pour débug

//document = objet par default
const root = document.getElementById('root');


const button = document.createElement('button');

button.textContent='Cocktail';
root.appendChild(button);


const fetchRandomDrink = async () => {
    const responseCocktail = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const jsonCocktail = await responseCocktail.json();

    return jsonCocktail.drinks[0];
}

function clearContainer(){
    root.innerHTML ="";
}

function createUl(randomDrink){
    const pIngr = document.createElement('ul');

    for (let i = 0; i < 15; i++) {
        const ingredient = randomDrink[`strIngredient${i}`];
        if (ingredient) {
            const ingredientItem = document.createElement("li");
            ingredientItem.innerHTML = ingredient;
            pIngr.appendChild(ingredientItem);
        }
    }

    root.appendChild(pIngr);
}

async function renderRandomCocktail(){
    const randomDrink = await fetchRandomDrink();

    const h1 = document.createElement('h1');
    h1.innerHTML = randomDrink.strDrink;

    const h2 = document.createElement('h2');
    h2.innerHTML = randomDrink.strCategory;

    const pInst= document.createElement('p');
    pInst.innerHTML = randomDrink.strInstructions;

    const image = document.createElement("img");
    image.src= randomDrink.strDrinkThumb;

    root.appendChild(button);
    root.appendChild(h1);
    root.appendChild(h2);
    root.appendChild(pInst);
    createUl(randomDrink);
    root.appendChild(image);
}

//const button = createButton();
//const container = createContainer();
button.addEventListener('click',async() =>{
    clearContainer();
    await renderRandomCocktail();
});