import jwt from "jsonwebtoken";
import { JWT_ACCESS_EXPIRES_IN, JWT_ADMIN_ACCESS_SIGNATURE, JWT_ADMIN_REFRESH_SIGNATURE, JWT_REFRESH_EXPIRES_IN, JWT_USER_ACCESS_SIGNATURE, JWT_USER_REFRESH_SIGNATURE } from "../../config/config.js";
import { BadRequestException, UnAuthorizeException } from "../exceptions/app.exeption.js";
import { RoleEnum } from "../user.enum.js";
 

export function signToken({ payload={},signature,options } = {}) {
  return jwt.sign(payload,signature,options);
}
export function verifyToken({ token = {}, signature } = {}) {
  return jwt.verifyToken(token , signature );
}
export function decodeToken({ token  } ) {
  return jwt.decodeToken(token ,  );
}
export function getSignature(userRole = RoleEnum.USER) {
  let signatures = {};
  switch (userRole) {
    case RoleEnum.USER:
      signatures.access_signature = JWT_USER_ACCESS_SIGNATURE;
      signatures.refresh_signature = JWT_USER_REFRESH_SIGNATURE;
      break;
    case RoleEnum.ADMIN:
      signatures.access_signature = JWT_ADMIN_ACCESS_SIGNATURE;
      signatures.refresh_signature = JWT_ADMIN_REFRESH_SIGNATURE;
      break;                       // ← add this
    default:
      break;
  }
  return signatures;
}
export function createLoginTokens({
  user,
  options,
  refreshExpiresIn = JWT_REFRESH_EXPIRES_IN,
} = {}) {
  const { access_signature, refresh_signature } = getSignature(user.role);

  const access_token = signToken({
    payload: { id: user.id },          // يفضل تضيف payload
    signature: access_signature,
    options: {
      ...options,
      expiresIn: JWT_ACCESS_EXPIRES_IN,
      subject: user.id,
      audience:[user.role],
    },
  });

  const refresh_token = signToken({
    payload: { id: user.id },          // يفضل تضيف payload
    signature: refresh_signature,
    options: {
      ...options,
      expiresIn: refreshExpiresIn,
      subject: user.id,                 // ← هنا التصحيح
      audience:[user.role],
    },
  });

  return { access_token, refresh_token };
}
export async function checkToken({ token, tokenType } = {}) {
  const payload = decodeToken(token);
  
  if (!payload.aud.length ) {
    throw BadRequestException("Invadid token, loging again ")
    
}

 const { access_signature, refresh_signature } = getSignature(payload.aud[0]);
 
 
 
    jwt.verify(
    token,
    tokenType == TokenTypeEnum.ACCESS
      ? access_signature
      : refresh_signature,
  );

  if (!payload.sub) {
    throw UnAuthorizeException("Id Not Found");
  }

  const user = await FindByIDDowc({ model: userModel, id: payload.sub });

  if (!user) {
    throw UnAuthorizeException("User Not Found");
  }
  return {user, payload}
}