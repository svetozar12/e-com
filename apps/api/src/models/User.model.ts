import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  createdAt: Date;
  updatedAt: Date;
  verificationCode: number;
  verified: boolean;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  verificationCode: {
    type: Number,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<IUser>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User = model<IUser>('User', userSchema);

export default User;
