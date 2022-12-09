console.log('hello sup de vinci');  // ligne de commande pour débug

const root = document.getElementById('root');

// créer un nouveau bouton
// au clic sur ce bouton, faites un appel fetch https://www.thecocktaildb.com/api/json/v1/1/search.php?s=
// affichez les résultats dans votre DOM
// créez vos différentes fonctions dans une ou plusieurs classes
// Si vous avez terminé, tentez de refactoriser votre classe en plusieurs classes
// en utilisant le principe SRP de SOLID
// https://www.freecodecamp.org/news/solid-principles-single-responsibility-principle-explained/

class cocktail{
    //Crée des cocktail

    constructor(nom,category,instruction,ingredient,image){
        this.nom=nom;
        this.category=category;
        this.instruction=instruction;
        this.ingredient=ingredient;
        this.image=image;
    }

    getNom(){
        return this.nom;
    }
    getCategory(){
        return this.category;
    }
    getinstruction(){
        return this.instruction;
    }
    getIngredient(){
        return this.ingredient;
    }
    getImage(){
        return this.image;
    }

}

class buttonCocktail{


    constructor(){
        this.button = document.createElement('button');
        this.button.textContent='Afficher les cocktails';
        this.button.addEventListener('click',async() =>{
            this.clearContainer();
            await this.afficherCocktail();
        });
    }
    afficheButton(){
        root.append(this.button);
    }

    clearContainer(){
        root.innerHTML ="";
    }

    async fetchDrink(){
        const responseCocktail = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
        const jsonCocktail = await responseCocktail.json();
    
        return jsonCocktail.drinks;
        //return jsonCocktail.drinks[0];
    }

    createUl(randomDrink){
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

    async afficherCocktail(){
        console.log('Btn');
        //fonction qui affiche
        //appelle une fonction qui crée des cocktail 
        //affiche le tableau
        const randomDrink = await this.fetchDrink();
        root.appendChild(this.button);
        for (var i = 0; i < randomDrink.length; i++) {
            const h1 = document.createElement('h1');
            h1.innerHTML = randomDrink[i].strDrink;

            const h2 = document.createElement('h2');
            h2.innerHTML = randomDrink[i].strCategory;

            const pInst= document.createElement('p');
            pInst.innerHTML = randomDrink[i].strInstructions;

            const image = document.createElement("img");
            image.src= randomDrink[i].strDrinkThumb;
            root.appendChild(h1);
            root.appendChild(h2);
            root.appendChild(pInst);
            this.createUl(randomDrink[i]);
            root.appendChild(image);
          }
    }
}



// Crée le bouton
const button= new buttonCocktail();
button.afficheButton();