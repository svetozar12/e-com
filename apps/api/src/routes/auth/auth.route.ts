import { Router } from 'express';
import { gmailTransporter } from '../../main';
import { signUpBodySchema, verifyBodySchema } from './auth.schema';
import { randomVerificationCode } from './auth.utils';

export const authRouter = Router();

const users = {};

authRouter.post('/signUp', (req, res) => {
  const { email } = signUpBodySchema.parse(req.body);

  const code = randomVerificationCode();

  gmailTransporter.sendEmail(
    email,
    'Sending verification code',
    `Your code: ${code}`,
    (err, data) => {
      if (err) return res.json({ message: 'Sorry try later', err }).status(401);
      console.log(data);
      return res.json({ message: 'Code was sent successfully' });
    }
  );
  users[email] = { verificationCode: code };
});

authRouter.post('/verify', (req, res) => {
  const { code, email } = verifyBodySchema.parse(req.body);
  if (users[email].verificationCode !== code) {
    return res.send('Invalid code').status(400);
  }
  return res.send('GoodJob');
});
