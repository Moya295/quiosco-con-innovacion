"use server"

import { prisma } from "@/src/lib/prisma"
import { UserSchema } from "@/src/schema"
import { rule } from "postcss"

export async function createUser(data: unknown) {
    const result = UserSchema.safeParse(data)

    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await prisma.user.create({
        data: result.data
    })
}