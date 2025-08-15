import bcrypt from "bcrypt";
import { findUSerByEmail } from "./userService";

export async function verifyCredentials(email: string, plainPassword: string) {
  const user = await findUSerByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(plainPassword, user.password);

  if (!isValid) return null;

  const { password, ...safeUser } = user;
  return safeUser;
}
