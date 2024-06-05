"use server";
import { prisma } from "@/src/lib/prisma";
import { LoginSchema } from "@/src/schema";
import bcrypt from "bcrypt"

export async function serchUser(data: unknown) {
  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  const { email, pass } = result.data;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        pass : pass
      },
    });

    if (user && (await bcrypt.compare(pass, user.pass))) {
      return { success: true };
    } else {
      return { error: "Credenciales no válidas" };
    }
  } catch (error) {
    return { error: "Error al buscar el usuario" };
  }
}
