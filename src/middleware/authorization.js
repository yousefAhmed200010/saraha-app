
import { forbiddenException } from "../common/exceptions/app.exeption.js";
 


// function authorization(role) {
//   return async function (req, res, next) {
//     if (req.user.role < role) {
//       throw forbiddenException({erroMsg:"you dont have access"})
//     }

   


//     next();
//   };
// }



function authorization(role) {
  return async function (req, res, next) {
    if (!roles.invludes(req.use.role)) {
      throw forbiddenException({erroMsg:"you dont have access"})
    }

   


    next();
  };
}
export default authorization;