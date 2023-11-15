import { getDictionary } from '@/lib/dictionary';
import { ClassValue, clsx } from 'clsx';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
