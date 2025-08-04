import { atom } from "jotai";

export const isLogin = atom<boolean>(localStorage.getItem("id") ? true : false);
export const loginName = atom<string>('');