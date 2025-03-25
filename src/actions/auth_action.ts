"use server";
import { signIn } from "@/lib/auth";
import db from "@/lib/db";
import { BaseResult } from "@/types/base_result";
import { loginSchema, registerSchema } from "@/validation/auth_schema";
import bcrypt from "bcryptjs";
import { z } from "zod";
export const register = async (
  data: z.infer<typeof registerSchema>
): Promise<BaseResult> => {
  try {
    const isEmailExist = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (isEmailExist) {
      return {
        message: "Email already registered",
        isSuccess: false,
      };
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, confirmPassword, ...rest } = data;
    await db.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });
    return {
      message: "Successfully registered",
      isSuccess: true,
    };
  } catch (err) {
    console.error(err);
    return {
      message: "Failed to register",
      isSuccess: false,
    };
  }
};
export const login = async (
  data: z.infer<typeof loginSchema>
): Promise<BaseResult> => {
  try {
    const userExist = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!userExist) {
      return {
        message: "Email not registered",
        isSuccess: false,
      };
    }
    const isPasswordMatch = await bcrypt.compare(
      data.password,
      userExist.password
    );
    if (!isPasswordMatch) {
      return {
        message: "Password is incorrect",
        isSuccess: false,
      };
    }
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return {
      message: "Successfully logged in",
      isSuccess: true,
    };
  } catch (err) {
    console.error(err);
    return {
      message: "Failed to login",
      isSuccess: false,
    };
  }
};
