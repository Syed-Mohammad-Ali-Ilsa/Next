import { getCookies, getCookie, setCookie, removeCookies } from "cookies-next";

export const getUserFromCookie = () => {
  const cookie = getCookie("auth");
  if (!cookie) {
    return null;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = (user) => {
  setCookie("auth", user);
};

export const removeUserCookie = () => removeCookies("auth");
