import { UserData } from '@/api/auth/types';

export const getUser = (): UserData | null => {
  const value: string | null = localStorage.getItem('user');
  return value !== null ? (JSON.parse(value) as UserData) : null;
};
