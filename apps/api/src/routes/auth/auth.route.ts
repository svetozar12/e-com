import { Router } from 'express';
import { gmailTransporter } from '../../main';
import { signUpBodySchema, verifyBodySchema } from './auth.schema';
import { randomVerificationCode } from './auth.utils';
import { generateToken } from '../../utils/jwt.utils';
import User from '../../database/models/User.model';
import {
  INVALID_CODE,
  SEND_CODE_SUCCESSFULLY,
  SEND_CODE_UNSUCCESSFULLY,
} from './auth.constants';
import { StatusCodes } from 'http-status-codes';
import { EMAIL_CONTENT, EMAIL_SUBJECT } from '../../constants/email.constants';
import Cart from '../../database/models/Cart.model';
import { authMiddleware } from '../../middleware/auth.middleware';
export const authRouter = Router();

authRouter.post('/signUp', (req, res, next) => {
  try {
    const { email } = signUpBodySchema.parse(req.body);

    const code = randomVerificationCode();

    gmailTransporter.sendEmail(
      email,
      EMAIL_SUBJECT,
      EMAIL_CONTENT(code.toString()),
      async (error, info) => {
        console.log(error, info);
        if (error)
          return res
            .json({ message: SEND_CODE_UNSUCCESSFULLY })
            .status(StatusCodes.UNAUTHORIZED);

        let user = await User.findOneAndUpdate(
          { email },
          { verificationCode: code }
        ).lean();
        if (!user) {
          user = await User.create({
            email,
            verificationCode: code,
          });
        }
        await Cart.create({ userId: user._id, products: [] });
        return res.json({ message: SEND_CODE_SUCCESSFULLY });
      }
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authRouter.post('/verify', async (req, res, next) => {
  try {
    const { code, email } = verifyBodySchema.parse(req.body);
    const { verificationCode } = (await User.findOne({ email }).lean()) || {};
    if (verificationCode !== parseInt(code)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: INVALID_CODE });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { verificationCode: null }
    ).lean();
    const accessToken = generateToken({ email, _id: user._id });
    return res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

authRouter.get('/verifyToken', authMiddleware, (req, res) => {
  return res.status(200).send('Token is valid');
});
