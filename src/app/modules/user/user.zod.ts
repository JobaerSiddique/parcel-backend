import { z } from 'zod';
import { USER_ROLE } from './user.constant';



const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({message:"Name Must be required"}),
    email: z
      .string({message:"Email Must be required"})
      .email('Invalid email format'),
    password: z.string({message:"Password Must be required"}),
    role: z.enum([...Object.values(USER_ROLE)] as [string, ...string[]]).default(USER_ROLE.customer),
    phone: z.string({
      message:"Phone Must be required"
    }),
    address: z.string().optional(),
    isDeleted:z.boolean().default(false),
    isVerified:z.boolean().default(false)
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        message:"Name Must be required"
      })
      .email('Invalid email format'),
    password: z.string({
      message:"Password Must be required"
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  loginZodSchema,
};