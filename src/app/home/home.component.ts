import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../app-data.models';
import { AppStorageService } from '../app-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  activeCategory = 'All';

  constructor(
    private readonly storage: AppStorageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.recipes = this.storage.getRecipes().filter((recipe) => recipe.status === 'live' && !!recipe.imageUrl);
  }

  get categories(): string[] {
    return ['All', ...new Set(this.recipes.map((recipe) => recipe.category))];
  }

  get filteredRecipes(): Recipe[] {
    if (this.activeCategory === 'All') {
      return this.recipes;
    }

    return this.recipes.filter((recipe) => recipe.category === this.activeCategory);
  }

  get featuredRecipe(): Recipe | undefined {
    return this.filteredRecipes[0] ?? this.recipes[0];
  }

  setCategory(category: string): void {
    this.activeCategory = category;
  }

  openRecipe(recipeId: string): void {
    void this.router.navigate(['/recipes', recipeId]);
  }

  trackRecipe(_index: number, recipe: Recipe): string {
    return recipe.id;
  }
}
