import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
    @Input() recipe: Recipe;
    // @Output() recipeSelected = new EventEmitter<void>();

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
    }

    onSelected() {
        //this.recipeSelected.emit();
        // triggering the emit from the service
        this.recipeService.recipeSelected.emit(this.recipe);
    }

}
