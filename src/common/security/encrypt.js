import CryptoJS from "crypto-js";
import { ENCRYP_KEY } from "../../config/config.js";



export function encryptvalue({value,key=ENCRYP_KEY}) {
   return CryptoJS.AES.encrypt(value, key).toString()
}
export function dencryptvalue({ciphervalue,key=ENCRYP_KEY}) {
   const bytes = CryptoJS.AES.decrypt(ciphervalue, key);
return  bytes.toString(CryptoJS.enc.Utf8);
}