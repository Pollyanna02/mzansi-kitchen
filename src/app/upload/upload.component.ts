import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadDraft } from '../app-data.models';
import { AppStorageService } from '../app-storage.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  draft!: UploadDraft;
  categoryOptions = ['Braai', 'Pap', 'Potjiekos', 'Stews', 'Desserts', 'Sides', 'Street Food', 'Drinks', 'Baked Goods'];
  dietaryOptions = ['Family Favourite', 'Vegetarian', 'Spicy', 'Budget Friendly', 'Weekend Special'];
  successRecipeId?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly storage: AppStorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.successRecipeId = undefined;
      const recipeId = params.get('edit');
      if (recipeId) {
        this.loadRecipeDraft(recipeId);
        return;
      }

      this.draft = this.storage.getUploadDraft();
    });
  }

  get completionStep(): number {
    if (!this.draft.title || !this.draft.description || !this.draft.category) {
      return 1;
    }

    if (!this.hasFilledIngredients()) {
      return 2;
    }

    if (!this.hasFilledSteps()) {
      return 3;
    }

    return 4;
  }

  get hasExistingRecipe(): boolean {
    return !!this.draft?.recipeId;
  }

  addIngredient(): void {
    this.draft.ingredients.push({ amount: '', unit: '', name: '' });
    this.persistDraft();
  }

  removeIngredient(index: number): void {
    this.draft.ingredients.splice(index, 1);
    if (!this.draft.ingredients.length) {
      this.draft.ingredients.push({ amount: '', unit: '', name: '' });
    }
    this.persistDraft();
  }

  addStep(): void {
    this.draft.steps.push('');
    this.persistDraft();
  }

  removeStep(index: number): void {
    this.draft.steps.splice(index, 1);
    if (!this.draft.steps.length) {
      this.draft.steps.push('');
    }
    this.persistDraft();
  }

  selectCategory(category: string): void {
    this.draft.category = category;
    this.persistDraft();
  }

  toggleDietaryTag(tag: string): void {
    if (this.draft.dietaryTags.includes(tag)) {
      this.draft.dietaryTags = this.draft.dietaryTags.filter((item) => item !== tag);
    } else {
      this.draft.dietaryTags = [...this.draft.dietaryTags, tag];
    }
    this.persistDraft();
  }

  onFieldChange(): void {
    this.persistDraft();
  }

  saveDraft(): void {
    this.storage.saveDraft(this.sanitisedDraft());
    this.draft = this.storage.getUploadDraft();
  }

  publishRecipe(): void {
    const recipeId = this.storage.publishDraft(this.sanitisedDraft());
    this.successRecipeId = recipeId;
  }

  viewRecipe(): void {
    if (!this.successRecipeId) {
      return;
    }

    void this.router.navigate(['/recipes', this.successRecipeId]);
  }

  startNewRecipe(): void {
    this.storage.resetDraft();
    this.draft = this.storage.getUploadDraft();
    this.successRecipeId = undefined;
    void this.router.navigate(['/upload']);
  }

  editSubmittedRecipe(): void {
    if (!this.successRecipeId) {
      return;
    }

    const recipeId = this.successRecipeId;
    this.successRecipeId = undefined;
    this.loadRecipeDraft(recipeId);
    void this.router.navigate(['/upload'], {
      queryParams: { edit: recipeId },
    });
  }

  backToMethod(): void {
    document.getElementById('method-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  deleteCurrentRecipe(): void {
    const recipeId = this.successRecipeId ?? this.draft?.recipeId;
    if (!recipeId) {
      return;
    }

    const shouldDelete = window.confirm('Delete this recipe? This cannot be undone.');
    if (!shouldDelete) {
      return;
    }

    this.storage.deleteRecipe(recipeId);
    this.successRecipeId = undefined;
    this.storage.resetDraft();
    this.draft = this.storage.getUploadDraft();
    void this.router.navigate(['/profile']);
  }

  async onFilesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) {
      return;
    }

    const previews = await Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(`${reader.result}`);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          })
      )
    );

    this.draft.imagePreviews = [...this.draft.imagePreviews, ...previews].slice(0, 3);
    this.persistDraft();
  }

  removeImage(index: number): void {
    this.draft.imagePreviews.splice(index, 1);
    this.persistDraft();
  }

  isSelectedCategory(category: string): boolean {
    return this.draft.category === category;
  }

  isSelectedDietaryTag(tag: string): boolean {
    return this.draft.dietaryTags.includes(tag);
  }

  trackByIndex(index: number): number {
    return index;
  }

  previewEmoji(): string {
    const emojiMap: Record<string, string> = {
      Braai: '🔥',
      Pap: '🌽',
      Potjiekos: '🥘',
      Stews: '🍲',
      Desserts: '🍩',
      Sides: '🥗',
      'Street Food': '🥖',
      Drinks: '🫖',
      'Baked Goods': '🍞',
    };

    return emojiMap[this.draft.category] ?? '🍽️';
  }

  totalMinutes(): number {
    return (this.draft.prepMinutes ?? 0) + (this.draft.cookMinutes ?? 0);
  }

  private loadRecipeDraft(recipeId: string): void {
    this.draft = this.storage.loadDraftFromRecipe(recipeId) ?? this.storage.getUploadDraft();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private persistDraft(): void {
    this.storage.updateDraft(this.draft);
  }

  private hasFilledIngredients(): boolean {
    return this.draft.ingredients.some((item) => item.name.trim());
  }

  private hasFilledSteps(): boolean {
    return this.draft.steps.some((step) => step.trim());
  }

  private sanitisedDraft(): UploadDraft {
    return {
      ...this.draft,
      ingredients: this.draft.ingredients.filter((item) => item.amount || item.unit || item.name),
      steps: this.draft.steps.filter((step) => step.trim()),
    };
  }
}
