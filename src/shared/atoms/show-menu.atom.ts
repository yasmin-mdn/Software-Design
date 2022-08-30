import { atom } from "recoil";

export const ShowMenuState = atom<boolean>({
  key: "showMenu",
  default: false,
});
