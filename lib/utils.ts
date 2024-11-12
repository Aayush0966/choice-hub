import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getUserId = () =>
  {
   const user = localStorage.getItem('user');
   if (user) {
    const parsedUser = JSON.parse(user)
    return parsedUser.userId;
   }
   else {
    const userId = uuidv4();
    const user = {
      userId,
      polls: {}
    }
    localStorage.setItem('user', JSON.stringify(user))
    return userId
   }
  } 

