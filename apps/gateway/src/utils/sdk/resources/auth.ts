import {
  MessageResponse,
  VerifyResponse,
} from '../../../codegen/types.generated';
import { instance } from '../sdk';

async function signUp(reqData: { email: string }): Promise<MessageResponse> {
  return (await instance.post('/auth/signUp', reqData)).data;
}

async function verify(reqData: {
  email: string;
  code: string;
}): Promise<VerifyResponse> {
  return (await instance.post('/auth/verify', reqData)).data;
}

async function verifyToken(token: string): Promise<MessageResponse> {
  return (
    await instance.get('/auth/verifyToken', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    })
  ).data;
}

export const auth = () => ({
  signUp: signUp,
  verify: verify,
  verifyToken: verifyToken,
});
