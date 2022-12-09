console.log('hello sup de vinci');  // ligne de commande pour débug

const root = document.getElementById('root');



class apiData{
    constructor(api){
        this.api=api;
    }

    async fetchDrink(){
        const responseCocktail = await fetch(this.api)
        const jsonCocktail = await responseCocktail.json();
    
        return jsonCocktail.drinks;
    }
}

class cocktail{
    constructor(drink){
        this.h1 = document.createElement('h1');
        this.h1.innerHTML = drink.strDrink;

        this.h2 = document.createElement('h2');
        this.h2.innerHTML = drink.strCategory;

        this.pInst= document.createElement('p');
        this.pInst.innerHTML = drink.strInstructions;

        this.image = document.createElement("img");
        this.image.src= drink.strDrinkThumb;

        this.pIngr = document.createElement('ul');
        for (let i = 0; i < 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            if (ingredient) {
                const ingredientItem = document.createElement("li");
                ingredientItem.innerHTML = ingredient;
                this.pIngr.appendChild(ingredientItem);
            }
        }
    }

    getH1(){return this.h1}
    getH2(){return this.h2}
    getInst(){return this.pInst}
    getIngr(){return this.pIngr}
    getImg(){return this.image};
}

class buttonCocktail{

    constructor(json){
        this.button = document.createElement('button');
        this.button.textContent='Afficher les cocktails';
        this.json=json;
        this.bool= Boolean(true);
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

    async afficherCocktail(){
        root.appendChild(this.button);
        if(this.bool){
            const randomDrink = await this.json;
            for (var i = 0; i < randomDrink.length; i++) {
                const drinkChoice = new cocktail(randomDrink[i]);
                root.appendChild(drinkChoice.getH1());
                root.appendChild(drinkChoice.getH2());
                root.appendChild(drinkChoice.getInst());
                root.appendChild(drinkChoice.getIngr());
                root.appendChild(drinkChoice.getImg());
            }
        }
        this.bool = !this.bool;
    }
}

// Crée le bouton
const api = new apiData("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
const button= new buttonCocktail(api.fetchDrink());
button.afficheButton();
//division par 3 des classes