// cookieService.js
import Cookies from 'js-cookie';

const TOKEN_COOKIE_KEY = 'auth_token';

export const setAuthTokenCookie = (token) => {
  Cookies.set(TOKEN_COOKIE_KEY, token, { expires: 1 }); // Expira em 1 dia (ajuste conforme necessário)
};

export const getAuthTokenCookie = () => {
  return Cookies.get(TOKEN_COOKIE_KEY);
};

export const removeAuthTokenCookie = () => {
  Cookies.remove(TOKEN_COOKIE_KEY);
};
