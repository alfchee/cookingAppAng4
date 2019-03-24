import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService}  from '../shopping-list/shopping-list.service';
import * from ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
        	"Recipe",
        	'This is a simple test',
        	"https://www.cyberciti.biz/media/new/category/old/linux-logo.png",
        	[
        		new Ingredient('Meat',1),
        		new Ingredient('French Fries', 20)
        	]),
        new Recipe(
        	"Other Recipe",
        	'This is a simple test',
        	"https://www.cyberciti.biz/media/new/category/old/linux-logo.png",
        	[
        		new Ingredient('Buns',2),
        		new Ingredient('Meat',1),
        	])
    ];

    //constructor (private slService: ShoppingListService,
    constructor(private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
    	// this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {

    }
}