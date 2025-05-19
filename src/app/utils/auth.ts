import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = `token=${token}; path=/; max-age=86400`; // 24 hours
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? match[2] : null;
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
}; 