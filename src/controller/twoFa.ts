//  import { authenticator } from 'otplib'
import { authenticator } from "@otplib/preset-default";
import qrcode from "qrcode";
import prisma from "../utils/prismaClient";

const service = "Airtime2Cash";
const secret = authenticator.generateSecret();

export async function twoFaVerify(pin: string, id: string) {
  const secret = await prisma.user.findUnique({ where: { id }, select:{twoFaSecret: true} });
}

export async function twoFaGenerate(id: string) {
  const user_id = id;
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
