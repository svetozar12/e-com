import mongoose from 'mongoose';
import { envs } from '../main';
import Category, { ICategory } from '../models/Category.model';

// Sample data
const categories: Partial<ICategory>[] = [
  {
    name: 'Electronics',
    subcategories: [
      {
        name: 'Smartphones',
        childSubcategories: [
          { name: 'iPhone' },
          { name: 'Samsung Galaxy' },
          { name: 'Google Pixel' },
        ],
      },
      {
        name: 'Laptops',
        childSubcategories: [
          { name: 'MacBook' },
          { name: 'Dell XPS' },
          { name: 'HP Spectre' },
        ],
      },
    ],
  },
  {
    name: 'Clothing',
    subcategories: [
      { name: "Men's Clothing" },
      { name: "Women's Clothing" },
      { name: "Kids' Clothing" },
    ],
  },
  {
    name: 'Home & Garden',
    subcategories: [
      { name: 'Furniture' },
      { name: 'Kitchenware' },
      { name: 'Home Decor' },
    ],
  },
];

// Function to seed the database
export async function seedDatabase() {
  const { DB_URL } = envs;
  // Connect to MongoDB
  await mongoose.connect(DB_URL);
  try {
    // Clear existing data
    await Category.deleteMany({});

    // Insert categories and subcategories
    const createdCategories: ICategory[] = [];
    for (const categoryData of categories) {
      const createdCategory = await Category.create(categoryData);
      createdCategories.push(createdCategory);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
