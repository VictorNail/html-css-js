console.log('hello sup de vinci');  // ligne de commande pour débug

//document = objet par default
const root = document.getElementById('root');


const button = document.createElement('button');

button.textContent='appuye moi';

root.appendChild(button);



const fetchRandomDrink = async () => {
    const responseCocktail = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    return await responseCocktail.json();
}

button.addEventListener("click", async() =>{
    const response = await fetchRandomDrink();
    const randomDrink =response.drinks[0];
    const h1 = document.createElement('h1');
    h1.innerHTML = randomDrink.strDrink;
    const h2 = document.createElement('h2');
    h2.innerHTML = randomDrink.strCategory;
    const pInst= document.createElement('p');
    pInst.innerHTML = randomDrink.strInstructions;
    const pIngr = document.createElement('ul');
    for (let i = 0; i < 15; i++) {
        const ingredient = randomDrink[`strIngredient${i}`];
        if (ingredient) {
            const ingredientItem = document.createElement("li");
            ingredientItem.innerHTML = ingredient;
            pIngr.appendChild(ingredientItem);
        }
    }
    const image = document.createElement("img");
    image.src= randomDrink.strDrinkThumb;
    root.innerHTML ="";
    root.appendChild(button);
    root.appendChild(h1);
    root.appendChild(h2);
    root.appendChild(pInst);
    root.appendChild(pIngr);
    root.appendChild(image);
})


//addEventListener permet d'attendre qu'un event arrive
//await = assynchrome de malade =styléefunction 

//const test2 =() => {}

//fonction fléché
// explicite mais vite ilisible
// button.addEventListener('click',()=>{
//     console.log('bouton cliqué')
//     fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
//         .then((response) => {
//             return response.json()
//         })
//         .then((response) => {
//             //console.log(JSON.stringify(response)) affiche le JSON
//             const randomDrink =response.drinks[0];
//             const h1= document.createElement('h1');
//             h1.innerHTML = randomDrink.strDrink;
//             root.appendChild(h1);
//         })
//         .catch(error=>{
//             alert("Erreur : "+ error)
//         });
// });

// promesse avec un status en attente/
// async function getDrink()

// const = constante let,var= changement sur le scope
// let et const permet de crée plusieur mini valeur dans le scope
//Const ou let
//const root = document.querySelector('#root');