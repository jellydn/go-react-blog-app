import { atomWithStorage } from "jotai/utils";
import { useAtomDevtools } from "jotai/devtools";

export const tokenAtom = atomWithStorage("token", "");

if (process.env.NODE_ENV !== "production") {
  tokenAtom.debugLabel = "Token";
}

export const useTokenDevtools = () => {
  useAtomDevtools(tokenAtom, "User Token");
};
