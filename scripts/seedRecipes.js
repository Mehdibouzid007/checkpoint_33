require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const connectDB = require('../config/connectDB');

const recipes = [
  {
    title: "Couscous",
    difficulty: 3,
    taste: 4.8,
    ingredients: ["semolina", "vegetables", "meat (lamb or chicken)", "spices"],
    image: "https://www.la-cuisine-marocaine.com/photos-recettes/01-couscous-au-khlii-aux-sept-aux-l.jpg",
    description: "A traditional North African dish with steamed semolina served with vegetables and meat.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-cooking-preparation-33103-large.mp4"
  },
  {
    title: "Tajine (Moroccan Stew)",
    difficulty: 4,
    taste: 4.9,
    ingredients: ["chicken or lamb", "dried fruits", "spices", "vegetables"],
    image: "https://images.radio-canada.ca/v1/alimentation/ingredient/1x1/tajine-generique.jpg",
    description: "A slow-cooked stew with tender meat, dried fruits, and aromatic spices.",
    video: "https://www.youtube.com/watch?v=1o6rRz8K3wU"
  },
  {
    title: "Mloukhiya",
    difficulty: 3,
    taste: 4.7,
    ingredients: ["mloukhiya leaves", "meat", "garlic", "spices"],
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Mloukhia_2.jpg",
    description: "A thick, savory stew made from minced leaves of mloukhiya, often served with rice or bread.",
    video: "https://www.youtube.com/watch?v=qkoBCDPnJHU"
  },
  {
    title: "Brik (Tunisian Pastry)",
    difficulty: 2,
    taste: 4.5,
    ingredients: ["phyllo dough", "egg", "tuna", "capers", "spices"],
    image: "https://mangez-moi.fr/wp-content/uploads/2018/08/Brick-tunisienne-au-thon-et-oeuf-coulant.jpg",
    description: "Deep-fried crispy pastry filled with tuna, egg, and herbs.",
    video: "https://www.youtube.com/watch?v=CyDu9HvQtWA"
  },
  {
    title: "Harira",
    difficulty: 3,
    taste: 4.6,
    ingredients: ["tomatoes", "lentils", "chickpeas", "meat", "spices"],
    image: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/ac78b24b-0bfd-5985-a49a-7f040f32eda3/f36a0204-8fa2-58ec-8723-4ee56362d5d3.jpg",
    description: "A hearty soup with tomatoes, lentils, chickpeas, and tender meat, flavored with herbs and spices.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-making-a-traditional-moroccan-harira-soup-42215-large.mp4"
  },
  {
    title: "Baghrir (Moroccan Pancake)",
    difficulty: 2,
    taste: 4.4,
    ingredients: ["semolina", "yeast", "baking powder", "water"],
    image: "https://www.allrecipes.com/thmb/Z5M2b2i_B0v_1Yd5f_v8-i-c-c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8538921-baghrir-moroccan-pancakes-FranceC-4x3-1-2000-b36518a53943464a930f45353505716c.jpg",
    description: "Light, spongy pancakes with many holes, traditionally served with honey.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-making-crepes-in-a-pan-42213-large.mp4"
  },
  {
    title: "Moroccan Mint Tea",
    difficulty: 1,
    taste: 4.9,
    ingredients: ["green tea", "fresh mint", "sugar"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Moroccan_mint_tea.jpg/1200px-Moroccan_mint_tea.jpg",
    description: "A traditional Moroccan tea made with green tea, fresh mint, and sugar."
  },
  {
    title: "Kalaa (Algerian Chicken Stew)",
    difficulty: 4,
    taste: 4.7,
    ingredients: ["chicken", "potatoes", "tomatoes", "spices"],
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Chicken_stew_with_potatoes.jpg",
    description: "A spicy and flavorful chicken stew with potatoes and spiced broth.",
    video: "https://www.youtube.com/watch?v=FvVq4X-qCpo"
  },
  {
    title: "Shakshuka (North African style)",
    difficulty: 2,
    taste: 4.8,
    ingredients: ["eggs", "tomatoes", "onions", "spices"],
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Shakshuka-01.jpg",
    description: "Poached eggs in a spicy tomato sauce, popular as breakfast or lunch.",
    video: "https://www.youtube.com/watch?v=PL1jKAl2Mtk"
  },
  {
    title: "Chorba (North African Soup)",
    difficulty: 2,
    taste: 4.6,
    ingredients: ["vegetables", "meat or chicken", "spices", "rice"],
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Chorba.jpg",
    description: "A nourishing soup with vegetables, meat, and rice, flavored with herbs.",
    video: "https://www.youtube.com/watch?v=0hsgz_g2fw8"
  },
  {
    title: "Fricassé (Moroccan Dumplings)",
    difficulty: 3,
    taste: 4.5,
    ingredients: ["flour", "yeast", "sugar", "olive oil"],
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Moroccan_fricassee.jpg",
    description: "Savory fried dough balls served with honey or syrup, popular street snack.",
    video: "https://www.youtube.com/watch?v=suX9j4x8n_M"
  },
  {
    title: "Makroudh (Sweet Pastry)",
    difficulty: 4,
    taste: 4.9,
    ingredients: ["semolina", "honey", "date paste", "sesame seeds"],
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Makroudh_02.JPG",
    description: "Sweet pastry filled with date paste, coated in honey, and sprinkled with sesame.",
    video: "https://www.youtube.com/watch?v=wEy6vsV7twY"
  },
  {
    title: "Moroccan Couscous with Lamb",
    difficulty: 4,
    taste: 4.8,
    ingredients: ["semolina", "lamb", "vegetables", "spices"],
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Couscous_lamb_and_vegetables.jpg",
    description: "Traditional North African dish of steamed semolina with tender lamb and vegetables.",
    video: "https://www.youtube.com/watch?v=4kmXu7Eak9o"
  },
  {
    title: "Tlitli (Libyan Pasta and Chickpeas)",
    difficulty: 3,
    taste: 4.4,
    ingredients: ["pasta (tlitli)", "chickpeas", "tomatoes", "spices"],
    image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Tlitli.jpg",
    description: "An flavorful Libyan dish with pasta, chickpeas, and tomato broth.",
    video: "https://www.youtube.com/watch?v=Ka1v8LmNQ7s"
  },
  {
    title: "Briouats (North African Savory Pastries)",
    difficulty: 3,
    taste: 4.7,
    ingredients: ["phyllo or warqa dough", "meat or vegetables", "spices"],
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Briouats_tunisiennes_2017.JPG",
    description: "Deep-fried savory or sweet filled pastries, often with meat or almonds.",
    video: "https://www.youtube.com/watch?v=7wfY4f2lHto"
  }
];

const seedRecipes = async () => {
    try {
        await connectDB();
        
        // Clear existing recipes (optional - remove if you want to keep existing data)
        await Recipe.deleteMany({});
        console.log('Cleared existing recipes');
        
        // Insert recipes
        await Recipe.insertMany(recipes);
        console.log(`Successfully seeded ${recipes.length} recipes`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding recipes:', error);
        process.exit(1);
    }
};

seedRecipes();

