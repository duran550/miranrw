import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Role {
  ADMIN = 1,
  VIEWER = 2,
  CLEANER = 3,
  RISK_MANAGER = 4,
}
