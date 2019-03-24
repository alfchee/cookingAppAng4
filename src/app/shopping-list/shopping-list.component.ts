import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActons from './store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    shoppingListState: Observable<{ingredients: Ingredient[]}>;
    // private subscription: Subscription;

    constructor(private slService: ShoppingListService,
        private store: Store<fromShoppingList>) { }

    ngOnInit() {
        // populating ingredients on init, to have data to render when first loading
        this.shoppingListState = this.store.select('shoppingList');
        // subscribing to an even, then when changes in the array
        // of ingredients, then the function inside will be executed
        // this.subscription = this.slService.ingredientsChanged
        //     .subscribe(
        //         (ingredients: Ingredient[]) => {
        //             this.ingredients = ingredients;
        //         }
        //     );
    }

    onEditItem(index: number) {
        // this.slService.startedEditing.next(index);
        this.store.dispatch(new ShoppingListActions.StartEdit(index));
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }
}
