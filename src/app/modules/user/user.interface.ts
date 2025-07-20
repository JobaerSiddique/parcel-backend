import { USER_ROLE } from "./user.constant";


export interface IUser {
  name: string;
  email: string;
  password: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE]
  phone: string;
  address?: string;
   isDeleted:boolean;
  isVerified?: boolean;
}


export  type TUserRole = keyof typeof USER_ROLE