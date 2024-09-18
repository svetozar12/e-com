import { instance } from '../sdk';

async function signUp(reqData: { email: string }) {
  return instance.post('/auth/signUp', reqData);
}

async function verify(reqData: { email: string; code: string }) {
  return instance.post('/auth/verify', reqData);
}

async function verifyToken(token: string) {
  return instance.get('/auth/verifyToken', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const auth = () => ({
  signUp: signUp,
  verify: verify,
  verifyToken: verifyToken,
});
