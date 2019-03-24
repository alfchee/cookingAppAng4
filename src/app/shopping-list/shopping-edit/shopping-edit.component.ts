import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
    //@ViewChild('nameInput') nameInputRef: ElementRef;
    //@ViewChild('amountInput') amountInputRef: ElementRef;
    @ViewChild('f') slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    //editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private store: Store<fromShoppingList.AppState>) { }

    ngOnInit() {
        this.store.select('shoppingList')
            .subscribe(
                data => {
                    if(data.editedItemIndex > -1) {
                        this.editedItem = data.editedIngredient;
                        this.editMode = true;
                        this.slForm.setValue({
                            name: this.editedItem.name,
                            amount: this.editedItem.amount
                        })
                    } else {
                        this.editMode = false;
                    }
                }
            );
        // this.subscription = this.slService.startedEditing
        //     .subscribe(
        //         (index: number) => {
        //             this.editedItemIndex = index;
        //             this.editMode = true;
        //             this.editedItem = this.slService.getIngredient(index);
        //             this.slForm.setValue({
        //                 name: this.editedItem.name,
        //                 amount: this.editedItem.amount
        //             })
        //         }
        //     )
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if(this.editMode) {
            // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
            this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient: newIngredient }));
        } else {
            // this.slService.addIngredient(newIngredient);
            this.store.dispatch(ShoppingListActions.AddIngredient(newIngredient));
        }
        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.slForm.reset();
        this.editMode = false;
    }

    onAddItem() {
        const ingName = this.nameInputRef.nativeElement.value;
        const ingAmount = this.amountInputRef.nativeElement.value;
        const newIngredient = new Ingredient(ingName, ingAmount);
        // this.ingredientAdded.emit(newIngredient);
        this.slService.addIngredient(newIngredient);
    }

    onDelete() {
        // this.slService.deleteIngredient(this.editedItemIndex);
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        this.onClear();
    }

    ngOnDestroy() {
    //     this.subscription.unsubscribe();
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

}
