import { BadRequestException } from "../../common/exceptions/app.exeption.js";
import { createLoginTokens } from "../../common/security/token.security.js";
import {
  JWT_ACCESS_EXPIRES_IN
} from "../../config/config.js";

export async function rotateToken(payload) {
const tokenExpiryDate = payload.iat + JWT_ACCESS_EXPIRES_IN; // 1/10
const currentDate = Date.now() / 1000; // 30/9

if (tokenExpiryDate > currentDate) {
    throw BadRequestException({ errMsg: "Old Token Still Valid " });
}
 return createLoginTokens({
  payload: { sub: payload.sub },
  refreshExpiresIn:
    JWT_REFRESH_EXPIRES_IN - (Math.ceil(Date.now() / 1000) - payload.iat),
});
}

