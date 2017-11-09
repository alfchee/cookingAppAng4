import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recepie-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Recipe",'This is a simple test',"https://www.cyberciti.biz/media/new/category/old/linux-logo.png")
  ];

  constructor() { }

  ngOnInit() {
  }

}
