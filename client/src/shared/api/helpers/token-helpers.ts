import Cookies from 'js-cookie';

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain:
      process.env.NODE_ENV === 'development'
        ? 'localhost'
        : 'e-commerce-project-9j4f.vercel.app',
    sameSite: 'strict',
    expires: 1,
  });
};

export const removeCookiesFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};
