import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Product, { IProduct } from '../models/Product.model';
import { envs } from '../../main';

if (process.env.NODE_ENV === 'production')
  throw Error("DON'T RUN SEED IN PRODUCTION");

// Connect to MongoDB
mongoose
  .connect(envs.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    seedProducts();
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Seed data function
const seedProducts = async (): Promise<void> => {
  try {
    // Clear the existing data
    await Product.deleteMany({});

    // Define some sample products
    const categories = ['Laptops', 'PCs', 'Smartphones'];
    const images = ['test1.png', 'test2.png', 'test3.png', 'test4.png'];

    const products: IProduct[] = [
      {
        name: 'Laptop',
        description: 'A powerful laptop for work and gaming',
        price: 999.99,
        quantity: 50,
        category: 'Laptops',
        image: 'test1.png',
      },
      {
        name: 'Headphones',
        description: 'Noise-cancelling over-ear headphones',
        price: 199.99,
        quantity: 200,
        category: 'PCs',
        image: 'test2.png',
      },
      {
        name: 'Coffee Mug',
        description: 'Ceramic mug for coffee and tea lovers',
        price: 9.99,
        quantity: 150,
        category: 'Smartphones',
        image: 'test3.png',
      },
      // Generate random products using Faker
      ...Array.from({ length: 100 }).map(() => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        quantity: faker.number.int({ min: 10, max: 100 }),
        category: categories[Math.floor(Math.random() * categories.length)], // Random category from the list
        image: images[Math.floor(Math.random() * images.length)], // Random image from the list
      })),
    ] as IProduct[];

    // Insert the sample products into the database
    await Product.insertMany(products);
    console.log('Seed data inserted successfully');

    // Close the MongoDB connection
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};
