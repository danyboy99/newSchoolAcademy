import jwt from "jsonwebtoken";

export const jwt_secret = "omotehinse";

export const signToken = (user: any) => {
  const payload = {
    user: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
  };
  return jwt.sign(payload, jwt_secret);
};

export const decodeToken = async (authorization: string) => {
  try {
    const decode: any = jwt.verify(authorization, jwt_secret);
    return decode.user;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
