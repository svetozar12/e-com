import { Router } from 'express';
import { gmailTransporter } from '../../main';
import { signUpBodySchema, verifyBodySchema } from './auth.schema';
import { randomVerificationCode } from './auth.utils';
import { generateToken } from '../../utils/jwt.utils';
import User from '../../models/User.model';

export const authRouter = Router();

authRouter.post('/signUp', (req, res) => {
  const { email } = signUpBodySchema.parse(req.body);

  const code = randomVerificationCode();

  gmailTransporter.sendEmail(
    email,
    'Sending verification code',
    `Your code: ${code}`,
    (err, data) => {
      if (err) return res.json({ message: 'Sorry try later', err }).status(401);
      User.create({ email, verificationCode: code, verified: false });
      return res.json({ message: 'Code was sent successfully' });
    }
  );
});

authRouter.post('/verify', async (req, res) => {
  const { code, email } = verifyBodySchema.parse(req.body);
  const { verificationCode } = await User.findOne({ email }).lean();
  if (verificationCode !== parseInt(code)) {
    return res.send('Invalid code').status(400);
  }

  const user = await User.findOneAndUpdate(
    { email },
    { verificationCode: null, verified: true }
  ).lean();
  const accessToken = generateToken({ email, id: user._id });
  return res.json(accessToken);
});
