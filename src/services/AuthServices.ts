import User, { UserCreateAttributes } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Op } from "sequelize";
import VerificationCode from "../models/VerificationCode";
import PasswordResetToken from "../models/PasswordResetToken";
import { sendEmail } from "../utils/emailServices";

export async function registerUser(data: UserCreateAttributes) {
  const { email, phone, date, type, password } = data;

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { phone }],
    },
  });
  if (existingUser) {
    throw new Error("Email or phone already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    phone,
    date,
    type,
    password: hashedPassword,
    ConfirmPassword: hashedPassword,
  });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await VerificationCode.create({
    userId: newUser.id,
    code,
  });

  await sendEmail({
    to: newUser.email,
    subject: "رمز تفعيل الحساب - Noon",
    text: `مرحباً،

رمز تفعيل حسابك هو: ${code}

إذا لم تقم بطلب هذا الرمز، يرجى تجاهل هذه الرسالة.

شكراً لاستخدامك Noon.`,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto; color: #333;">
      <h2 style="color: #0078d7; text-align: center;">رمز تفعيل الحساب الخاص بك</h2>
      <p style="font-size: 16px;">مرحباً،</p>
      <p style="font-size: 16px;">رمز تفعيل حسابك في <strong>Noon</strong> هو:</p>
      <p style="font-size: 28px; font-weight: bold; color: #e94e77; text-align: center; margin: 20px 0;">${code}</p>
      <p style="font-size: 14px; color: #555;">إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بأمان.</p>
      <hr style="border:none; border-top:1px solid #ddd; margin: 30px 0;">
      <p style="font-size: 14px; text-align: center; color: #777;">شكراً لاستخدامك Noon.</p>
    </div>
  `,
  });

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { newUser, token };
}

export async function verifyUserAccount(userId: number, code: string) {
  const record = await VerificationCode.findOne({ where: { userId, code } });
  if (!record) {
    throw new Error("Invalid verification code");
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  await record.destroy();

  return user;
}

export async function signinUser(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }


  const accesstoken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" }
  );

  const refreshtoken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { user, accesstoken, refreshtoken };

}
export async function sendPasswordResetLink(email: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("This email is not registered with us");
  }

  let existingToken = await PasswordResetToken.findOne({
    where: { userId: user.id },
  });

  if (!existingToken) {
    const token = crypto.randomBytes(32).toString("hex");

    existingToken = await PasswordResetToken.create({
      userId: user.id,
      token,
    });
  }

  const resetLink = `http://localhost:8000/api/auth/reset-password/${user.id}/${existingToken.token}`;

  const html = `<p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>`;

  await sendEmail({
    to: user.email,
    subject: "Password Reset - Noon-Platform",
    html,
  });

  return;
}

export async function validateResetLink(userId: number, token: string) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = await PasswordResetToken.findOne({
    where: { userId: user.id, token },
  });

  if (!resetToken) {
    throw new Error("Invalid or expired link");
  }

  return true;
}

export async function resetUserPassword(
  userId: number,
  token: string,
  password: string
) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = await PasswordResetToken.findOne({
    where: { userId: user.id, token },
  });

  if (!resetToken) {
    throw new Error("Invalid or expired link");
  }

  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  user.ConfirmPassword = hashed;

  await user.save();
  await resetToken.destroy();

  return;
}
