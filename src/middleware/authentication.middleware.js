import { UnAuthorizeException } from "../common/exceptions/app.exception.js";
import { checkToken } from "../common/security/token.security.js";
function auth(tokenType = TokenTypeEnum.ACCESS) {
  return async function (req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw UnAuthorizeException("you need to log in");
    }

    const [key, credential] = authorization.split(' ')

    switch (key) {
      case "Basic":
        console.log(Buffer.from(credential, "base64").toString().toString(":"));
        break;
      case "Bearer":
        const [user, payload] = await checkToken({ token: credential, tokenType });
        req.user = user;
        req.payload = payload;
        next();
        break;
      default:
        throw UnAuthorizeException("Invalid authorization header");
    }

    next();
  };
}
export default auth;