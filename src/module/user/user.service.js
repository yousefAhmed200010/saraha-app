
import jwt from "jsonwebtoken";
import { ConflictException, NotFoundException } from "../../common/exceptions/app.exeption.js";
import { encryptvalue } from "../../common/security/encrypt.js";
import { compareHash, hashvalue } from "../../common/security/hash.js";
import { createDoc, findOneDoc } from "../../DB/db.repo.js";
import userModel1 from "../../DB/model/user.model.js";
export async function signup(userData) {
  const { email, password } = userData;

  const userEmail = await findOneDoc({ model: userModel1, filter: { email } });

  if (userEmail) {
    throw ConflictException("email already exists");
  }

  userData.password = await hashvalue({ value: password, });

  userData.phone = encryptvalue({ value: userData.phone, });


  const newUser = await createDoc({
    model: userModel1,
    insertedData: userData,
  });

  return newUser;
}

export async function login(userData) {
  const { email, password } = userData;

  const user = await findOneDoc({ model: userModel1, filter: { email } });

  if (!user) {
    throw NotFoundException({ errMsg: "invalid email or password" });
  }

  const isMatch = await compareHash({ value: password, hash: user.password, });

  if (!isMatch) {
    throw NotFoundException({ errMsg: "invalid email or password" });
  }

  const token = jwt.sign({ test: "for test" }, "y_sogmature",)
  return{token}
}

// export async function signup(userData) {}
