import mongoose from 'mongoose';

export const connectMongo = async (url: string) => {
  await mongoose.connect(url, {
    autoIndex: true,
  });
  console.log('Mongo:✅');
};
