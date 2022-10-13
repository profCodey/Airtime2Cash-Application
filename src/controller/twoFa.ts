//  import { authenticator } from 'otplib'
import { authenticator } from "otplib";
import qrcode from "qrcode";
import prisma from "../utils/prismaClient";

const service = "Airtime2Cash";
export async function twoFaVerify(token: string, id: string) {
    const user_token  = await prisma.user.findUnique({ where: { id }, select: { twoFaSecret: true } })
    if (!user_token?.twoFaSecret) {
        throw "No 2FA for the user"
    }
    const secret = user_token.twoFaSecret
    const isValid = authenticator.verify({token,secret})
    return(isValid)
}

export async function twoFaGenerate(id: string) {
    const user_id = id; // base32 encoded hex secret key
    const secret = authenticator.generateSecret();
    
    const user = await prisma.user.update({
        where: { id },
        data: {
            twoFaSecret: secret,
    },
  });
  if (!user) {
    throw "No user found";
  }

    const otpauth = authenticator.keyuri(user_id, service, secret);
  const qrImageUrl = await new Promise((resolve, reject) => {
    qrcode.toDataURL(otpauth, (err, imageUrl) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(imageUrl);
    });
  });
  return qrImageUrl;
}
