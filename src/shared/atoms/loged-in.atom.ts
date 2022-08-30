import { atom } from "recoil";
import { CookieHandler } from "../classes";

export const LogedInState = atom<boolean>({
  key: "LogedIn",
  default: !!CookieHandler.getToken(),
});
