import jwt from 'jsonwebtoken';
import { envs } from '../main';

interface Payload {
  _id: number;
  email: string;
}

// Generate a JWT token
export const generateToken = (payload: Payload, expiresIn = 3600): string => {
  const { JWT_SECRET } = envs;
  console.log(expiresIn, 'EXPIRES IN');
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });
};

// Verify a JWT token
export const verifyToken = (
  token: string
): { valid: boolean; payload?: Payload | string } => {
  try {
    const { JWT_SECRET } = envs;

    const decoded = jwt.verify(token, JWT_SECRET, {
      clockTolerance: 60,
    }) as Payload;
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, payload: error.message };
  }
};
