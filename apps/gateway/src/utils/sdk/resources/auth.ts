import { instance } from '../sdk';

async function signUp(reqData: { email: string }) {
  return (await instance.post('/auth/signUp', reqData)).data;
}

async function verify(reqData: { email: string; code: string }) {
  return (await instance.post('/auth/verify', reqData)).data;
}

async function verifyToken(token: string) {
  return (
    await instance.get('/auth/verifyToken', {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

export const auth = () => ({
  signUp: signUp,
  verify: verify,
  verifyToken: verifyToken,
});
