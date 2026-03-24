import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityItem, Profile, Recipe, SuggestedCook } from '../app-data.models';
import { AppStorageService } from '../app-storage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  recipes: Recipe[] = [];
  activities: ActivityItem[] = [];
  suggestedCooks: SuggestedCook[] = [];
  activeTab: 'recipes' | 'favourites' | 'activity' | 'reviews' = 'recipes';
  editingProfile = false;
  editModel!: Profile;

  constructor(
    private readonly router: Router,
    private readonly storage: AppStorageService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  get favouriteRecipes(): Recipe[] {
    return this.recipes.filter((recipe) => this.profile.favouriteRecipeIds.includes(recipe.id));
  }

  get myRecipes(): Recipe[] {
    const currentUserId = this.auth.getCurrentUser()?.id;
    if (!currentUserId) {
      return [];
    }

    return this.recipes.filter((recipe) => recipe.ownerUserId === currentUserId);
  }

  get profileReviews(): Array<{ recipeTitle: string; review: Recipe['reviews'][number] }> {
    return this.myRecipes.flatMap((recipe) =>
      recipe.reviews.map((review) => ({
        recipeTitle: recipe.title,
        review,
      }))
    );
  }

  get averageRating(): number {
    const reviews = this.profileReviews.map((item) => item.review.rating);
    if (!reviews.length) {
      return 0;
    }

    return reviews.reduce((sum, rating) => sum + rating, 0) / reviews.length;
  }

  refresh(): void {
    this.profile = this.storage.getProfile();
    this.recipes = this.storage.getRecipes();
    this.activities = this.storage.getActivities();
    this.suggestedCooks = this.storage.getSuggestedCooks();
    this.editModel = { ...this.profile };
  }

  setTab(tab: 'recipes' | 'favourites' | 'activity' | 'reviews'): void {
    this.activeTab = tab;
  }

  openRecipe(recipeId: string): void {
    void this.router.navigate(['/recipes', recipeId]);
  }

  editRecipe(recipeId: string): void {
    void this.router.navigate(['/upload'], {
      queryParams: { edit: recipeId },
    });
  }

  deleteRecipe(recipeId: string): void {
    this.storage.deleteRecipe(recipeId);
    this.refresh();
  }

  toggleEditProfile(): void {
    this.editingProfile = !this.editingProfile;
    this.editModel = { ...this.profile };
  }

  saveProfile(): void {
    this.storage.updateProfile({ ...this.editModel });
    this.editingProfile = false;
    this.refresh();
  }

  toggleCookFollow(cookId: string): void {
    this.storage.toggleCookFollow(cookId);
    this.refresh();
  }

  isFollowingCook(cookId: string): boolean {
    return this.profile.followingCookIds.includes(cookId);
  }

  statValue(value: number): string {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : `${value}`;
  }

  reviewStars(rating: number): string {
    return Array.from({ length: 5 }, (_, index) => (index < rating ? '★' : '☆')).join('');
  }
}
