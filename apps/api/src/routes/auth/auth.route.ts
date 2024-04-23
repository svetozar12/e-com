import { Router } from 'express';
import { gmailTransporter } from '../../main';
import { signUpBodySchema, verifyBodySchema } from './auth.schema';
import { randomVerificationCode } from './auth.utils';
import { generateToken } from '../../utils/jwt.utils';
import User from '../../models/User.model';
import {
  INVALID_CODE,
  SEND_CODE_SUCCESSFULLY,
  SEND_CODE_UNSUCCESSFULLY,
} from '../../constants/auth.constants';
import { StatusCodes } from 'http-status-codes';
import { EMAIL_CONTENT, EMAIL_SUBJECT } from '../../constants/email.constants';
import Cart from '../../models/Cart.model';
export const authRouter = Router();

authRouter.post('/signUp', (req, res) => {
  const { email } = signUpBodySchema.parse(req.body);

  const code = randomVerificationCode();

  gmailTransporter.sendEmail(
    email,
    EMAIL_SUBJECT,
    EMAIL_CONTENT(code.toString()),
    async (error) => {
      if (error)
        return res
          .json({ message: SEND_CODE_UNSUCCESSFULLY })
          .status(StatusCodes.UNAUTHORIZED);
      const user = await User.create({
        email,
        verificationCode: code,
        verified: false,
      });
      await Cart.create({ userId: user._id, products: [] });
      return res.json({ message: SEND_CODE_SUCCESSFULLY });
    }
  );
});

authRouter.post('/verify', async (req, res) => {
  const { code, email } = verifyBodySchema.parse(req.body);
  const { verificationCode } = await User.findOne({ email }).lean();
  if (verificationCode !== parseInt(code)) {
    return res.send(INVALID_CODE).status(StatusCodes.BAD_REQUEST);
  }

  const user = await User.findOneAndUpdate(
    { email },
    { verificationCode: null, verified: true }
  ).lean();
  const accessToken = generateToken({ email, id: user._id });
  return res.json(accessToken);
});
