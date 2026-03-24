export type RecipeStatus = 'live' | 'draft' | 'review';
export type AuthRole = 'user' | 'contributor' | 'admin';

export interface RecipeIngredient {
  amount: string;
  unit: string;
  name: string;
}

export interface RecipeStep {
  title: string;
  text: string;
  tip?: string;
}

export interface RecipeReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  imageUrl?: string;
  ownerUserId?: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  difficulty: string;
  spiceLevel: string;
  status: RecipeStatus;
  savedCount: number;
  imageGradient: [string, string];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tags: string[];
  reviews: RecipeReview[];
}

export interface SuggestedCook {
  id: string;
  name: string;
  avatar: string;
  location: string;
  recipes: number;
}

export interface Achievement {
  label: string;
  icon: string;
  unlocked: boolean;
}

export interface ActivityItem {
  id: string;
  icon: string;
  text: string;
  timeAgo: string;
}

export interface Profile {
  name: string;
  handle: string;
  location: string;
  bio: string;
  avatar: string;
  verified: boolean;
  followers: number;
  following: number;
  favouriteRecipeIds: string[];
  followingCookIds: string[];
  achievements: Achievement[];
}

export interface UploadDraft {
  recipeId?: string;
  title: string;
  description: string;
  category: string;
  prepMinutes: number | null;
  cookMinutes: number | null;
  servings: number | null;
  difficulty: string;
  spiceLevel: string;
  dietaryTags: string[];
  ingredients: RecipeIngredient[];
  steps: string[];
  imagePreviews: string[];
  status: RecipeStatus;
}

export interface AppState {
  profile: Profile;
  recipes: Recipe[];
  uploadDraft: UploadDraft;
  activities: ActivityItem[];
  suggestedCooks: SuggestedCook[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: AuthRole;
}

export interface AuthSession {
  userId: string;
}
