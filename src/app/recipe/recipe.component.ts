import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Recipe } from '../app-data.models';
import { AppStorageService } from '../app-storage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipe?: Recipe;
  relatedRecipes: Recipe[] = [];
  checkedIngredients = new Set<number>();
  selectedServings = 1;
  reviewRating = 5;
  reviewComment = '';
  isTimerRunning = false;
  remainingSeconds = 0;
  private timerSub?: Subscription;

  constructor(
    public readonly storage: AppStorageService,
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('id') ?? this.storage.getFeaturedRecipeId();
      this.loadRecipe(recipeId);
    });
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  get isFavourite(): boolean {
    return !!this.recipe && this.storage.getProfile().favouriteRecipeIds.includes(this.recipe.id);
  }

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  get canUpload(): boolean {
    return this.auth.hasRole('contributor');
  }

  get averageRating(): number {
    if (!this.recipe?.reviews.length) {
      return 0;
    }

    const total = this.recipe.reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / this.recipe.reviews.length;
  }

  get ratingBreakdown(): Array<{ stars: number; count: number; percent: number }> {
    if (!this.recipe) {
      return [];
    }

    const total = this.recipe.reviews.length || 1;
    return [5, 4, 3, 2, 1].map((stars) => {
      const count = this.recipe!.reviews.filter((review) => review.rating === stars).length;
      return {
        stars,
        count,
        percent: (count / total) * 100,
      };
    });
  }

  get displayTime(): string {
    const minutes = Math.floor(this.remainingSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(this.remainingSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  loadRecipe(recipeId: string): void {
    const recipe = this.storage.getRecipe(recipeId);
    if (!recipe) {
      void this.router.navigate(['/recipes', this.storage.getFeaturedRecipeId()]);
      return;
    }

    this.recipe = recipe;
    this.relatedRecipes = this.storage
      .getRecipes()
      .filter((item) => item.id !== recipe.id && item.status === 'live')
      .slice(0, 3);
    this.selectedServings = recipe.servings;
    this.remainingSeconds = recipe.cookMinutes * 60;
    this.checkedIngredients = new Set<number>();
    this.isTimerRunning = false;
    this.timerSub?.unsubscribe();
  }

  toggleFavourite(): void {
    if (!this.recipe) {
      return;
    }

    if (!this.isAuthenticated) {
      this.redirectToLogin();
      return;
    }

    this.storage.toggleFavourite(this.recipe.id);
    this.loadRecipe(this.recipe.id);
  }

  toggleIngredient(index: number): void {
    if (this.checkedIngredients.has(index)) {
      this.checkedIngredients.delete(index);
    } else {
      this.checkedIngredients.add(index);
    }
  }

  changeServings(delta: number): void {
    this.selectedServings = Math.max(1, this.selectedServings + delta);
  }

  scaledAmount(amount: string): string {
    if (!this.recipe) {
      return amount;
    }

    const numeric = Number(amount);
    if (Number.isNaN(numeric) || this.recipe.servings === 0) {
      return amount;
    }

    const scaled = (numeric / this.recipe.servings) * this.selectedServings;
    return Number.isInteger(scaled) ? `${scaled}` : scaled.toFixed(1);
  }

  setReviewRating(rating: number): void {
    this.reviewRating = rating;
  }

  submitReview(): void {
    if (!this.recipe || !this.reviewComment.trim()) {
      return;
    }

    if (!this.isAuthenticated) {
      this.redirectToLogin();
      return;
    }

    this.storage.addReview(this.recipe.id, this.reviewRating, this.reviewComment.trim());
    this.reviewComment = '';
    this.reviewRating = 5;
    this.loadRecipe(this.recipe.id);
  }

  startPauseTimer(): void {
    if (!this.recipe) {
      return;
    }

    if (this.isTimerRunning) {
      this.isTimerRunning = false;
      this.timerSub?.unsubscribe();
      return;
    }

    this.isTimerRunning = true;
    this.timerSub = interval(1000).subscribe(() => {
      if (this.remainingSeconds <= 1) {
        this.resetTimer();
        return;
      }

      this.remainingSeconds -= 1;
    });
  }

  resetTimer(): void {
    this.isTimerRunning = false;
    this.timerSub?.unsubscribe();
    this.remainingSeconds = (this.recipe?.cookMinutes ?? 0) * 60;
  }

  openRecipe(recipeId: string): void {
    void this.router.navigate(['/recipes', recipeId]);
  }

  shareRecipe(): void {
    if (!this.recipe || !navigator.share) {
      return;
    }

    void navigator.share({
      title: this.recipe.title,
      text: this.recipe.description,
      url: window.location.href,
    });
  }

  printRecipe(): void {
    window.print();
  }

  private redirectToLogin(): void {
    void this.router.navigate(['/login'], {
      queryParams: {
        redirectTo: this.router.url,
      },
    });
  }

  stars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, index) => (index < rating ? '★' : '☆'));
  }
}
