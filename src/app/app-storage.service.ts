import { Injectable } from '@angular/core';
import {
  ActivityItem,
  AppState,
  Profile,
  Recipe,
  RecipeIngredient,
  RecipeReview,
  SuggestedCook,
  UploadDraft,
} from './app-data.models';

const STORAGE_KEY = 'mzansi-kitchen-state';

const defaultState: AppState = {
  profile: {
    name: 'Thandeka Mokoena',
    handle: '@thandeka.cooks',
    location: 'Johannesburg, GP',
    bio: "Home cook sharing my gogo's traditional recipes. Pap lover, braai queen, cooking from the heart of Mzansi.",
    avatar: 'TM',
    verified: true,
    followers: 1200,
    following: 89,
    favouriteRecipeIds: ['boerewors-braai', 'malva-pudding'],
    followingCookIds: ['sipho-nkosi'],
    achievements: [
      { label: 'Home Chef', icon: '👨‍🍳', unlocked: true },
      { label: 'Braai Master', icon: '🔥', unlocked: true },
      { label: 'Top Rated', icon: '⭐', unlocked: true },
      { label: 'Contributor', icon: '📤', unlocked: true },
      { label: 'Legend', icon: '👑', unlocked: false },
      { label: '100 Recipes', icon: '💯', unlocked: false },
    ],
  },
  recipes: [
    {
      id: 'pap-wors',
      title: 'Classic Pap & Wors with Chakalaka',
      description: 'A Sunday favourite with creamy pap, smoky boerewors, and a warm chakalaka spooned over the top.',
      category: 'Pap',
      emoji: '🌽',
      imageUrl: 'assets/Pap-and-Wors.png',
      prepMinutes: 10,
      cookMinutes: 25,
      servings: 4,
      difficulty: 'Easy',
      spiceLevel: 'Medium spice',
      status: 'live',
      savedCount: 312,
      imageGradient: ['#f5c842', '#e8a020'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'white maize meal' },
        { amount: '4', unit: 'cups', name: 'water' },
        { amount: '1', unit: 'tsp', name: 'salt' },
        { amount: '500', unit: 'g', name: 'boerewors' },
        { amount: '1', unit: 'tbsp', name: 'oil' },
        { amount: '1', unit: '', name: 'onion, diced' },
        { amount: '2', unit: '', name: 'garlic cloves, minced' },
        { amount: '1', unit: '', name: 'carrot, grated' },
        { amount: '1', unit: '', name: 'green pepper, sliced' },
        { amount: '1', unit: 'tin', name: 'baked beans' },
      ],
      steps: [
        {
          title: 'Boil the water',
          text: 'Bring salted water to a lively boil in a heavy pot before adding the maize meal.',
        },
        {
          title: 'Whisk in the maize meal',
          text: 'Pour the maize meal slowly while stirring continuously to avoid lumps.',
          tip: 'Use a wooden spoon and keep stirring from the center outwards for a smoother pap.',
        },
        {
          title: 'Steam until fluffy',
          text: 'Reduce the heat, cover tightly, and steam for 20 minutes before giving it a final stir.',
        },
        {
          title: 'Braai the wors',
          text: 'Cook the boerewors on a hot braai or grill pan, turning every few minutes until browned and cooked through.',
          tip: 'Do not prick the casing or you will lose the juices.',
        },
        {
          title: 'Make the chakalaka',
          text: 'Soften onion and garlic in oil, then add the carrot, peppers, and baked beans. Simmer until glossy and rich.',
          tip: 'A pinch of sugar balances the acidity and rounds out the flavour.',
        },
        {
          title: 'Plate and serve',
          text: 'Spoon pap onto plates, slice the wors, and finish with hot chakalaka.',
        },
      ],
      tags: ['South African', 'Pap', 'Boerewors', 'Braai', 'Comfort Food', 'Family', 'Chakalaka', 'Weekend'],
      reviews: [
        {
          id: 'rev-1',
          author: 'Thandeka M.',
          avatar: 'TM',
          rating: 5,
          comment: 'Made this for my family on Sunday and everyone went back for seconds. The pap came out perfectly smooth.',
          createdAt: '2 days ago',
        },
        {
          id: 'rev-2',
          author: 'Sipho N.',
          avatar: 'SN',
          rating: 5,
          comment: 'This tastes exactly like the version I grew up with. Proper comfort food.',
          createdAt: '1 week ago',
        },
        {
          id: 'rev-3',
          author: 'Fatima J.',
          avatar: 'FJ',
          rating: 4,
          comment: 'Great recipe and easy to follow. I just needed a little extra simmer time on the chakalaka.',
          createdAt: '2 weeks ago',
        },
      ],
    },
    {
      id: 'boerewors-braai',
      title: 'Boerewors Braai',
      description: 'Simple, smoky boerewors cooked over hot coals and served with fresh rolls and chakalaka.',
      category: 'Braai',
      emoji: '🥩',
      imageUrl: 'assets/braai meat.webp',
      prepMinutes: 5,
      cookMinutes: 20,
      servings: 4,
      difficulty: 'Easy',
      spiceLevel: 'Mild',
      status: 'live',
      savedCount: 198,
      imageGradient: ['#8a5932', '#6a3512'],
      ingredients: [
        { amount: '500', unit: 'g', name: 'boerewors' },
        { amount: '4', unit: '', name: 'bread rolls' },
      ],
      steps: [
        { title: 'Heat the braai', text: 'Prepare medium-hot coals.' },
        { title: 'Cook the wors', text: 'Braai gently, turning often, until cooked through.' },
      ],
      tags: ['Braai', 'Weekend'],
      reviews: [
        {
          id: 'rev-4',
          author: 'Karen B.',
          avatar: 'KB',
          rating: 5,
          comment: 'Perfect for match day.',
          createdAt: '5 days ago',
        },
      ],
    },
    {
      id: 'oxtail-potjie',
      title: 'Oxtail Potjie',
      description: 'A slow-cooked potjie layered with rich oxtail, vegetables, and deep savoury flavour.',
      category: 'Potjiekos',
      emoji: '🥘',
      imageUrl: 'assets/portjie kos.jpeg',
      prepMinutes: 30,
      cookMinutes: 180,
      servings: 6,
      difficulty: 'Hard',
      spiceLevel: 'Mild',
      status: 'live',
      savedCount: 172,
      imageGradient: ['#6b4d34', '#3d2818'],
      ingredients: [
        { amount: '1.2', unit: 'kg', name: 'oxtail' },
      ],
      steps: [
        { title: 'Brown the meat', text: 'Sear the oxtail until deeply caramelised.' },
      ],
      tags: ['Potjie'],
      reviews: [],
    },
    {
      id: 'malva-pudding',
      title: 'Malva Pudding',
      description: 'Soft sponge baked until golden and soaked in a buttery cream sauce.',
      category: 'Desserts',
      emoji: '🥧',
      imageUrl: 'assets/malva pudding.jpg',
      prepMinutes: 15,
      cookMinutes: 40,
      servings: 8,
      difficulty: 'Medium',
      spiceLevel: 'Sweet',
      status: 'live',
      savedCount: 241,
      imageGradient: ['#d8a45c', '#8d5b2d'],
      ingredients: [
        { amount: '1', unit: 'cup', name: 'flour' },
      ],
      steps: [
        { title: 'Mix the batter', text: 'Whisk the wet and dry ingredients until smooth.' },
      ],
      tags: ['Dessert'],
      reviews: [],
    },
    {
      id: 'jollof-rice',
      title: 'West African Jollof Rice',
      description: 'Tomato-rich party rice with warming spice, soft peppers, and that classic smoky finish.',
      category: 'Rice',
      emoji: '🍚',
      imageUrl: 'assets/rice and stew.webp',
      prepMinutes: 20,
      cookMinutes: 45,
      servings: 6,
      difficulty: 'Medium',
      spiceLevel: 'Hot',
      status: 'live',
      savedCount: 287,
      imageGradient: ['#d56d2a', '#9c2f1d'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'long grain rice' },
        { amount: '3', unit: '', name: 'tomatoes' },
        { amount: '2', unit: '', name: 'red peppers' },
      ],
      steps: [
        { title: 'Blend the base', text: 'Blend tomatoes, peppers, and onion into a smooth sauce.' },
        { title: 'Build the stew', text: 'Cook down the sauce with spices until rich and deep red.' },
        { title: 'Steam the rice', text: 'Add stock and rice, cover, and cook until fluffy and smoky.' },
      ],
      tags: ['West Africa', 'Rice', 'Celebration'],
      reviews: [],
    },
    {
      id: 'bunny-chow',
      title: 'Durban Bunny Chow',
      description: 'A hollowed loaf packed with spicy curry, soft potatoes, and bold Durban flavour.',
      category: 'Street Food',
      emoji: '🍛',
      imageUrl: 'assets/durban bunny chow.jpg',
      prepMinutes: 25,
      cookMinutes: 35,
      servings: 4,
      difficulty: 'Medium',
      spiceLevel: 'Hot',
      status: 'live',
      savedCount: 154,
      imageGradient: ['#d88b19', '#7c3414'],
      ingredients: [
        { amount: '1', unit: 'loaf', name: 'white bread' },
        { amount: '500', unit: 'g', name: 'beef or bean curry' },
        { amount: '2', unit: '', name: 'potatoes' },
      ],
      steps: [
        { title: 'Cook the curry', text: 'Simmer the curry until thick, fragrant, and deeply spiced.' },
        { title: 'Prep the loaf', text: 'Cut and hollow the bread loaf without tearing the crust.' },
        { title: 'Fill and serve', text: 'Spoon the hot curry into the bread and serve immediately.' },
      ],
      tags: ['South Africa', 'Durban', 'Street Food'],
      reviews: [],
    },
    {
      id: 'doro-wat',
      title: 'Ethiopian Doro Wat',
      description: 'Slow-simmered chicken stew with berbere spice, onions, and a silky rich sauce.',
      category: 'Stews',
      emoji: '🍗',
      prepMinutes: 25,
      cookMinutes: 70,
      servings: 6,
      difficulty: 'Hard',
      spiceLevel: 'Medium',
      status: 'live',
      savedCount: 133,
      imageGradient: ['#913320', '#51180f'],
      ingredients: [
        { amount: '1', unit: 'kg', name: 'chicken pieces' },
        { amount: '4', unit: '', name: 'onions' },
        { amount: '3', unit: 'tbsp', name: 'berbere spice' },
      ],
      steps: [
        { title: 'Cook the onions', text: 'Slowly cook the onions until deeply caramelised.' },
        { title: 'Add spice and chicken', text: 'Bloom berbere in butter, then coat and simmer the chicken.' },
        { title: 'Finish the stew', text: 'Cook until thick and glossy, ready for injera or rice.' },
      ],
      tags: ['Ethiopia', 'Stew', 'Berbere'],
      reviews: [],
    },
    {
      id: 'mogodu',
      title: 'Slow-Cooked Mogodu',
      description: 'Tender tripe simmered with onion, tomato, and warming spices until rich and comforting.',
      category: 'Stews',
      emoji: '🍲',
      imageUrl: 'assets/mogudu.jpg',
      prepMinutes: 25,
      cookMinutes: 150,
      servings: 6,
      difficulty: 'Hard',
      spiceLevel: 'Medium',
      status: 'live',
      savedCount: 126,
      imageGradient: ['#8d5a2d', '#5b3419'],
      ingredients: [
        { amount: '1', unit: 'kg', name: 'cleaned tripe' },
        { amount: '1', unit: '', name: 'large onion, chopped' },
        { amount: '2', unit: '', name: 'tomatoes, grated' },
        { amount: '2', unit: 'tbsp', name: 'curry powder' },
      ],
      steps: [
        { title: 'Clean and parboil', text: 'Rinse the tripe well, then parboil it to tenderise and remove any excess smell.' },
        { title: 'Build the base', text: 'Saute onion until soft, then add tomato, curry powder, and seasoning.' },
        { title: 'Simmer gently', text: 'Add the tripe and enough water to cover, then simmer until deeply tender and flavourful.' },
      ],
      tags: ['South Africa', 'Comfort Food', 'Tripe'],
      reviews: [],
    },
    {
      id: 'jelly-custard-shots',
      title: 'Jelly Custard Shots',
      description: 'A nostalgic dessert with bright jelly, silky custard, and a party-ready layered finish.',
      category: 'Desserts',
      emoji: '🍮',
      imageUrl: 'assets/jelly-custard-shots-500x500.jpg',
      prepMinutes: 20,
      cookMinutes: 10,
      servings: 8,
      difficulty: 'Easy',
      spiceLevel: 'Sweet',
      status: 'live',
      savedCount: 89,
      imageGradient: ['#f6b6a9', '#f4d35e'],
      ingredients: [
        { amount: '1', unit: 'packet', name: 'strawberry jelly' },
        { amount: '2', unit: 'cups', name: 'prepared custard' },
        { amount: '1', unit: 'cup', name: 'whipped cream' },
      ],
      steps: [
        { title: 'Set the jelly', text: 'Prepare the jelly according to the packet directions and chill until softly set.' },
        { title: 'Layer the cups', text: 'Spoon jelly into small glasses, then top with smooth custard.' },
        { title: 'Finish and chill', text: 'Top with whipped cream or sprinkles, then chill until serving time.' },
      ],
      tags: ['Dessert', 'Party', 'Custard'],
      reviews: [],
    },
    {
      id: 'phuthu-namas',
      title: 'Phuthu and Namas',
      description: 'Crumbly maize meal served with tender braised meat in a rich savoury gravy.',
      category: 'Pap',
      emoji: '🌽',
      imageUrl: 'assets/amas.jpeg',
      prepMinutes: 20,
      cookMinutes: 75,
      servings: 5,
      difficulty: 'Medium',
      spiceLevel: 'Mild',
      status: 'live',
      savedCount: 118,
      imageGradient: ['#d2a160', '#7b4b26'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'maize meal' },
        { amount: '500', unit: 'g', name: 'beef chunks' },
        { amount: '1', unit: '', name: 'onion, sliced' },
        { amount: '2', unit: 'cups', name: 'beef stock' },
      ],
      steps: [
        { title: 'Cook the phuthu', text: 'Steam the maize meal with salted water until crumbly and fluffy.' },
        { title: 'Brown the meat', text: 'Sear the beef with onion until lightly caramelised.' },
        { title: 'Make the gravy', text: 'Pour in stock and simmer until the meat is tender and the sauce is rich.' },
      ],
      tags: ['Southern Africa', 'Pap', 'Beef'],
      reviews: [],
    },
    {
      id: 'pap-chicken-dust',
      title: 'Pap and Chicken Dust',
      description: 'Street-style pap served with smoky grilled chicken pieces and spicy tomato relish.',
      category: 'Street Food',
      emoji: '🍗',
      imageUrl: 'assets/pap ad chicken dust.webp',
      prepMinutes: 15,
      cookMinutes: 35,
      servings: 4,
      difficulty: 'Easy',
      spiceLevel: 'Medium',
      status: 'live',
      savedCount: 141,
      imageGradient: ['#d6974c', '#6c3921'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'maize meal' },
        { amount: '8', unit: '', name: 'chicken pieces' },
        { amount: '2', unit: 'tbsp', name: 'braai spice' },
        { amount: '1', unit: 'cup', name: 'tomato relish' },
      ],
      steps: [
        { title: 'Season the chicken', text: 'Coat the chicken with braai spice and a little oil.' },
        { title: 'Cook the pap', text: 'Steam the pap until soft and spoonable.' },
        { title: 'Grill and serve', text: 'Grill the chicken until charred and juicy, then serve over pap with relish.' },
      ],
      tags: ['Township Food', 'Pap', 'Chicken'],
      reviews: [],
    },
    {
      id: 'rice-and-stew',
      title: 'Rice and Beef Stew',
      description: 'Soft white rice served with a thick tomato-and-onion stew full of slow-cooked flavour.',
      category: 'Rice',
      emoji: '🍛',
      imageUrl: 'assets/rice and stew.webp',
      prepMinutes: 15,
      cookMinutes: 60,
      servings: 6,
      difficulty: 'Easy',
      spiceLevel: 'Mild',
      status: 'live',
      savedCount: 163,
      imageGradient: ['#b65d2f', '#7a2816'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'rice' },
        { amount: '600', unit: 'g', name: 'beef stew pieces' },
        { amount: '1', unit: '', name: 'onion' },
        { amount: '2', unit: '', name: 'tomatoes' },
      ],
      steps: [
        { title: 'Cook the rice', text: 'Boil the rice until fluffy, then keep warm.' },
        { title: 'Brown the beef', text: 'Sear the beef in batches for deeper flavour.' },
        { title: 'Finish the stew', text: 'Add onion, tomatoes, and stock, then simmer until tender and glossy.' },
      ],
      tags: ['Comfort Food', 'Rice', 'Stew'],
      reviews: [],
    },
    {
      id: 'samp-and-beans',
      title: 'Samp and Beans',
      description: 'A hearty pot of samp cooked until creamy with sugar beans, onion, and gentle seasoning.',
      category: 'Sides',
      emoji: '🥣',
      imageUrl: 'assets/samp.jpg',
      prepMinutes: 15,
      cookMinutes: 120,
      servings: 6,
      difficulty: 'Medium',
      spiceLevel: 'Mild',
      status: 'live',
      savedCount: 132,
      imageGradient: ['#d8b672', '#8b5f2c'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'samp' },
        { amount: '1', unit: 'cup', name: 'sugar beans' },
        { amount: '1', unit: '', name: 'onion, chopped' },
        { amount: '2', unit: 'tbsp', name: 'butter' },
      ],
      steps: [
        { title: 'Soak overnight', text: 'Soak the samp and beans in plenty of water overnight for even cooking.' },
        { title: 'Simmer until tender', text: 'Cook slowly in fresh water until both the samp and beans are soft.' },
        { title: 'Finish with onion', text: 'Stir in sauteed onion and butter, then season before serving.' },
      ],
      tags: ['South Africa', 'Side Dish', 'Beans'],
      reviews: [],
    },
    {
      id: 'pap-and-braai',
      title: 'Pap and Braai Plate',
      description: 'Soft pap plated with smoky braai meat and a spoon of fresh relish for a relaxed weekend feast.',
      category: 'Braai',
      emoji: '🔥',
      imageUrl: 'assets/pap and braai.jpg',
      prepMinutes: 15,
      cookMinutes: 35,
      servings: 4,
      difficulty: 'Easy',
      spiceLevel: 'Medium',
      status: 'live',
      savedCount: 148,
      imageGradient: ['#d7924e', '#6d311c'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'maize meal' },
        { amount: '600', unit: 'g', name: 'braai meat selection' },
        { amount: '1', unit: 'cup', name: 'tomato and onion relish' },
      ],
      steps: [
        { title: 'Prepare the pap', text: 'Cook the pap until smooth and spoonable.' },
        { title: 'Braai the meat', text: 'Grill the meat over hot coals until charred and juicy.' },
        { title: 'Plate and finish', text: 'Serve the braai over pap with a big spoon of relish.' },
      ],
      tags: ['South Africa', 'Braai', 'Weekend'],
      reviews: [],
    },
    {
      id: 'pap-and-pork',
      title: 'Pap and Pork Stew',
      description: 'Creamy pap served with rich pork pieces cooked low and slow in savoury sauce.',
      category: 'Pap',
      emoji: '🍖',
      imageUrl: 'assets/pap and pork.jpeg',
      prepMinutes: 20,
      cookMinutes: 60,
      servings: 5,
      difficulty: 'Medium',
      spiceLevel: 'Mild',
      status: 'live',
      savedCount: 109,
      imageGradient: ['#cf9d6c', '#6a3e24'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'maize meal' },
        { amount: '700', unit: 'g', name: 'pork shoulder, cubed' },
        { amount: '1', unit: '', name: 'onion, chopped' },
      ],
      steps: [
        { title: 'Brown the pork', text: 'Sear the pork pieces until golden on all sides.' },
        { title: 'Simmer the stew', text: 'Cook with onion, tomato, and stock until tender.' },
        { title: 'Serve with pap', text: 'Spoon the stew over hot pap and serve immediately.' },
      ],
      tags: ['Pap', 'Pork', 'Comfort Food'],
      reviews: [],
    },
    {
      id: 'beef-liver-stew',
      title: 'Beef Liver Stew',
      description: 'Quick-cooked liver in a glossy onion gravy, served hot with a homestyle finish.',
      category: 'Stews',
      emoji: '🥘',
      imageUrl: 'assets/beef liver.jpeg',
      prepMinutes: 15,
      cookMinutes: 25,
      servings: 4,
      difficulty: 'Medium',
      spiceLevel: 'Mild',
      status: 'live',
      savedCount: 96,
      imageGradient: ['#85523c', '#4e2b1f'],
      ingredients: [
        { amount: '500', unit: 'g', name: 'beef liver' },
        { amount: '1', unit: '', name: 'large onion' },
        { amount: '1', unit: 'cup', name: 'beef stock' },
      ],
      steps: [
        { title: 'Prep the liver', text: 'Trim and slice the liver into bite-sized pieces.' },
        { title: 'Cook the onions', text: 'Saute the onions until soft and lightly sweet.' },
        { title: 'Finish quickly', text: 'Add liver and stock, then simmer briefly so it stays tender.' },
      ],
      tags: ['Beef', 'Stew', 'Weeknight'],
      reviews: [],
    },
    {
      id: 'chips-and-ribs',
      title: 'Chips and Sticky Ribs',
      description: 'Golden chips with saucy ribs, built for sharing and loaded with smoky-sweet flavour.',
      category: 'Street Food',
      emoji: '🍟',
      imageUrl: 'assets/chips and ribs.jpg',
      prepMinutes: 20,
      cookMinutes: 50,
      servings: 4,
      difficulty: 'Medium',
      spiceLevel: 'Medium',
      status: 'live',
      savedCount: 177,
      imageGradient: ['#c78539', '#7c2918'],
      ingredients: [
        { amount: '800', unit: 'g', name: 'pork ribs' },
        { amount: '4', unit: '', name: 'large potatoes' },
        { amount: '1', unit: 'cup', name: 'sticky barbecue glaze' },
      ],
      steps: [
        { title: 'Roast the ribs', text: 'Cook the ribs until tender, then glaze and finish until sticky.' },
        { title: 'Fry the chips', text: 'Cut and fry the potatoes until golden and crisp.' },
        { title: 'Plate it up', text: 'Serve the ribs over a bed of hot chips.' },
      ],
      tags: ['Ribs', 'Chips', 'Sharing Plate'],
      reviews: [],
    },
    {
      id: 'pap-and-chicken-liver',
      title: 'Pap and Chicken Livers',
      description: 'Velvety pap topped with spicy peri-style chicken livers and a rich pan sauce.',
      category: 'Pap',
      emoji: '🍗',
      imageUrl: 'assets/pap and chicken liver.webp',
      prepMinutes: 15,
      cookMinutes: 25,
      servings: 4,
      difficulty: 'Easy',
      spiceLevel: 'Hot',
      status: 'live',
      savedCount: 131,
      imageGradient: ['#cb8550', '#6d2417'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'maize meal' },
        { amount: '500', unit: 'g', name: 'chicken livers' },
        { amount: '2', unit: 'tbsp', name: 'peri peri sauce' },
      ],
      steps: [
        { title: 'Cook the pap', text: 'Prepare the pap until smooth and creamy.' },
        { title: 'Saute the livers', text: 'Cook the chicken livers quickly with onion and peri sauce.' },
        { title: 'Serve hot', text: 'Ladle the livers and sauce over pap while still hot.' },
      ],
      tags: ['Pap', 'Chicken Livers', 'Spicy'],
      reviews: [],
    },
    {
      id: 'jollof-rice-stew-platter',
      title: 'Jollof Rice with Stew',
      description: 'A celebratory plate of jollof rice finished with a rich stew spooned right on top.',
      category: 'Rice',
      emoji: '🍚',
      imageUrl: 'assets/jallof rice with stew.jpeg',
      prepMinutes: 20,
      cookMinutes: 55,
      servings: 6,
      difficulty: 'Medium',
      spiceLevel: 'Medium',
      status: 'live',
      savedCount: 165,
      imageGradient: ['#cb5d2b', '#8f251d'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'rice' },
        { amount: '2', unit: '', name: 'red peppers' },
        { amount: '2', unit: 'cups', name: 'beef stew' },
      ],
      steps: [
        { title: 'Blend the pepper base', text: 'Blend tomato, peppers, and onion into a smooth cooking base.' },
        { title: 'Cook the rice', text: 'Steam the rice in the seasoned sauce until fluffy and coloured through.' },
        { title: 'Top with stew', text: 'Serve with a rich beef stew spooned generously over the rice.' },
      ],
      tags: ['West Africa', 'Rice', 'Stew'],
      reviews: [],
    },
    {
      id: 'amas-and-phuthu',
      title: 'Amasi and Phuthu',
      description: 'Cool amasi served alongside crumbly phuthu for a simple, deeply nostalgic meal.',
      category: 'Sides',
      emoji: '🥛',
      imageUrl: 'assets/amas.jpeg',
      prepMinutes: 10,
      cookMinutes: 25,
      servings: 4,
      difficulty: 'Easy',
      spiceLevel: 'Mild',
      status: 'live',
      savedCount: 87,
      imageGradient: ['#ede0c4', '#b98f62'],
      ingredients: [
        { amount: '2', unit: 'cups', name: 'maize meal' },
        { amount: '2', unit: 'cups', name: 'amasi' },
        { amount: '1', unit: 'tsp', name: 'salt' },
      ],
      steps: [
        { title: 'Steam the phuthu', text: 'Cook the maize meal until crumbly and dry, then fluff with a fork.' },
        { title: 'Chill the amasi', text: 'Keep the amasi cold until just before serving.' },
        { title: 'Serve together', text: 'Plate the warm phuthu with cool amasi for dipping and spooning.' },
      ],
      tags: ['Amasi', 'Phuthu', 'Traditional'],
      reviews: [],
    },
    {
      id: 'koeksister-ice-cream',
      title: 'Koeksister Ice Cream',
      description: 'A playful dessert draft inspired by syrupy koeksisters and creamy vanilla ice cream.',
      category: 'Desserts',
      emoji: '🍩',
      imageUrl: '',
      prepMinutes: 20,
      cookMinutes: 0,
      servings: 6,
      difficulty: 'Medium',
      spiceLevel: 'Sweet',
      status: 'draft',
      savedCount: 0,
      imageGradient: ['#e4c06f', '#c57d35'],
      ingredients: [
        { amount: '1', unit: 'L', name: 'vanilla ice cream' },
      ],
      steps: [
        { title: 'Prep the toppings', text: 'Slice koeksisters into bite-sized pieces.' },
      ],
      tags: ['Dessert', 'Draft'],
      reviews: [],
    },
  ],
  uploadDraft: {
    title: "My Gogo's Pap & Wors",
    description: 'A comforting family recipe with creamy pap, juicy wors, and a quick chakalaka.',
    category: 'Pap',
    prepMinutes: 15,
    cookMinutes: 30,
    servings: 4,
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    dietaryTags: ['Family Favourite'],
    ingredients: [
      { amount: '2', unit: 'cups', name: 'white maize meal' },
      { amount: '500', unit: 'g', name: 'boerewors' },
      { amount: '1', unit: 'tin', name: 'baked beans' },
    ],
    steps: [
      'Bring salted water to a boil and whisk in maize meal.',
      'Cover and steam on low heat until fluffy.',
      'Braai the wors and simmer the chakalaka.',
    ],
    imagePreviews: [],
    status: 'draft',
  },
  activities: [
    { id: 'act-1', icon: '⭐', text: 'Sipho N. left a 5-star review on Classic Pap & Wors.', timeAgo: '2 days ago' },
    { id: 'act-2', icon: '📤', text: 'Your Oxtail Potjie recipe was submitted for review.', timeAgo: '3 days ago' },
    { id: 'act-3', icon: '👤', text: 'Karen B. and 3 others started following you.', timeAgo: '5 days ago' },
  ],
  suggestedCooks: [
    { id: 'sipho-nkosi', name: 'Sipho Nkosi', avatar: 'SN', location: 'Durban', recipes: 38 },
    { id: 'fatima-jacobs', name: 'Fatima Jacobs', avatar: 'FJ', location: 'Cape Town', recipes: 55 },
    { id: 'zanele-dlamini', name: 'Zanele Dlamini', avatar: 'ZD', location: 'Soweto', recipes: 29 },
    { id: 'nompilo-mthembu', name: 'Nompilo Mthembu', avatar: 'NM', location: 'Pietermaritzburg', recipes: 21 },
  ],
};

@Injectable({ providedIn: 'root' })
export class AppStorageService {
  private state = this.loadState();

  getProfile(): Profile {
    return structuredClone(this.state.profile);
  }

  getRecipes(): Recipe[] {
    return structuredClone(this.state.recipes);
  }

  getRecipe(id: string): Recipe | undefined {
    return this.getRecipes().find((recipe) => recipe.id === id);
  }

  getFeaturedRecipeId(): string {
    return this.state.recipes.find((recipe) => recipe.status === 'live')?.id ?? defaultState.recipes[0].id;
  }

  getUploadDraft(): UploadDraft {
    return structuredClone(this.state.uploadDraft);
  }

  getActivities(): ActivityItem[] {
    return structuredClone(this.state.activities);
  }

  getSuggestedCooks(): SuggestedCook[] {
    return structuredClone(this.state.suggestedCooks);
  }

  updateProfile(profile: Profile): void {
    this.state.profile = structuredClone(profile);
    this.saveState();
  }

  toggleFavourite(recipeId: string): void {
    const favourites = new Set(this.state.profile.favouriteRecipeIds);
    const recipe = this.state.recipes.find((item) => item.id === recipeId);
    if (!recipe) {
      return;
    }

    if (favourites.has(recipeId)) {
      favourites.delete(recipeId);
      recipe.savedCount = Math.max(0, recipe.savedCount - 1);
    } else {
      favourites.add(recipeId);
      recipe.savedCount += 1;
    }

    this.state.profile.favouriteRecipeIds = Array.from(favourites);
    this.saveState();
  }

  toggleCookFollow(cookId: string): void {
    const following = new Set(this.state.profile.followingCookIds);
    if (following.has(cookId)) {
      following.delete(cookId);
      this.state.profile.following = Math.max(0, this.state.profile.following - 1);
    } else {
      following.add(cookId);
      this.state.profile.following += 1;
    }

    this.state.profile.followingCookIds = Array.from(following);
    this.saveState();
  }

  addReview(recipeId: string, rating: number, comment: string): void {
    const recipe = this.state.recipes.find((item) => item.id === recipeId);
    if (!recipe) {
      return;
    }

    const review: RecipeReview = {
      id: `rev-${Date.now()}`,
      author: this.state.profile.name,
      avatar: this.state.profile.avatar,
      rating,
      comment,
      createdAt: 'Just now',
    };

    recipe.reviews.unshift(review);
    this.state.activities.unshift({
      id: `act-${Date.now()}`,
      icon: '⭐',
      text: `You reviewed ${recipe.title}.`,
      timeAgo: 'Just now',
    });
    this.saveState();
  }

  deleteRecipe(recipeId: string): void {
    this.state.recipes = this.state.recipes.filter((recipe) => recipe.id !== recipeId);
    this.state.profile.favouriteRecipeIds = this.state.profile.favouriteRecipeIds.filter((id) => id !== recipeId);
    this.saveState();
  }

  saveDraft(draft: UploadDraft): string {
    const recipeId = draft.recipeId ?? this.slugify(draft.title || `recipe-${Date.now()}`);
    const recipe = this.toRecipe({ ...draft, recipeId }, 'draft');
    const recipeIndex = this.state.recipes.findIndex((item) => item.id === recipeId);

    if (recipeIndex >= 0) {
      this.state.recipes[recipeIndex] = recipe;
    } else {
      this.state.recipes.unshift(recipe);
    }

    this.state.uploadDraft = { ...structuredClone(draft), recipeId, status: 'draft' };
    this.state.activities.unshift({
      id: `act-${Date.now()}`,
      icon: '💾',
      text: `${recipe.title} was saved as a draft.`,
      timeAgo: 'Just now',
    });
    this.saveState();
    return recipeId;
  }

  publishDraft(draft: UploadDraft): string {
    const recipeId = draft.recipeId ?? this.slugify(draft.title || `recipe-${Date.now()}`);
    const recipe = this.toRecipe({ ...draft, recipeId }, 'live');
    const recipeIndex = this.state.recipes.findIndex((item) => item.id === recipeId);

    if (recipeIndex >= 0) {
      this.state.recipes[recipeIndex] = recipe;
    } else {
      this.state.recipes.unshift(recipe);
    }

    this.state.uploadDraft = this.buildEmptyDraft();
    this.state.activities.unshift({
      id: `act-${Date.now()}`,
      icon: '🚀',
      text: `${recipe.title} was published.`,
      timeAgo: 'Just now',
    });
    this.saveState();
    return recipeId;
  }

  updateDraft(draft: UploadDraft): void {
    this.state.uploadDraft = structuredClone(draft);
    this.saveState();
  }

  resetDraft(): void {
    this.state.uploadDraft = this.buildEmptyDraft();
    this.saveState();
  }

  private toRecipe(draft: UploadDraft & { recipeId: string }, status: Recipe['status']): Recipe {
    const existing = this.state.recipes.find((item) => item.id === draft.recipeId);
    return {
      id: draft.recipeId,
      title: draft.title || 'Untitled Recipe',
      description: draft.description || 'A newly uploaded Mzansi Kitchen recipe.',
      category: draft.category || 'Community',
      emoji: this.resolveRecipeEmoji(draft.category),
      imageUrl: existing?.imageUrl || draft.imagePreviews[0] || '',
      prepMinutes: draft.prepMinutes ?? 0,
      cookMinutes: draft.cookMinutes ?? 0,
      servings: draft.servings ?? 1,
      difficulty: draft.difficulty || 'Easy',
      spiceLevel: draft.spiceLevel || 'Mild',
      status,
      savedCount: existing?.savedCount ?? 0,
      imageGradient: existing?.imageGradient ?? ['#f5c842', '#e8a020'],
      ingredients: structuredClone(draft.ingredients),
      steps: draft.steps.map((text, index) => ({
        title: `Step ${index + 1}`,
        text,
      })),
      tags: [draft.category, ...draft.dietaryTags].filter(Boolean),
      reviews: existing?.reviews ?? [],
    };
  }

  private resolveRecipeEmoji(category: string): string {
    const emojiMap: Record<string, string> = {
      Braai: '🔥',
      Pap: '🌽',
      Potjiekos: '🥘',
      Stews: '🍲',
      Desserts: '🍩',
      Sides: '🥗',
      Drinks: '🫖',
      'Baked Goods': '🍞',
    };

    return emojiMap[category] ?? '🍽️';
  }

  private buildEmptyDraft(): UploadDraft {
    return {
      title: '',
      description: '',
      category: 'Pap',
      prepMinutes: null,
      cookMinutes: null,
      servings: null,
      difficulty: 'Easy',
      spiceLevel: 'Medium',
      dietaryTags: [],
      ingredients: [this.emptyIngredient()],
      steps: [''],
      imagePreviews: [],
      status: 'draft',
    };
  }

  private emptyIngredient(): RecipeIngredient {
    return { amount: '', unit: '', name: '' };
  }

  private loadState(): AppState {
    if (typeof window === 'undefined' || !window.localStorage) {
      return structuredClone(defaultState);
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
      return structuredClone(defaultState);
    }

    try {
      const parsed = JSON.parse(stored) as AppState;
      return {
        ...structuredClone(defaultState),
        ...parsed,
        recipes: this.mergeRecipes(parsed.recipes ?? []),
        activities: parsed.activities ?? structuredClone(defaultState.activities),
        suggestedCooks: parsed.suggestedCooks ?? structuredClone(defaultState.suggestedCooks),
        profile: { ...structuredClone(defaultState.profile), ...parsed.profile },
        uploadDraft: { ...structuredClone(defaultState.uploadDraft), ...parsed.uploadDraft },
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  private saveState(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  private mergeRecipes(storedRecipes: Recipe[]): Recipe[] {
    const byId = new Map(storedRecipes.map((recipe) => [recipe.id, recipe]));
    const mergedDefaults = defaultState.recipes.map((recipe) => {
      const storedRecipe = byId.get(recipe.id);
      return storedRecipe ? { ...recipe, ...storedRecipe } : structuredClone(recipe);
    });
    const extraRecipes = storedRecipes.filter((recipe) => !defaultState.recipes.some((item) => item.id === recipe.id));
    return [...mergedDefaults, ...extraRecipes];
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
