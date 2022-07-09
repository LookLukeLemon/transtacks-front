import { useCallback } from "react";
import { AppConfig, UserSession } from "@stacks/connect-react";
import { showConnect } from "@stacks/connect";
import { atom, useAtomValue } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { ENV_MAINNET } from "common/Constants";
import axios from "axios";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSessionState = atom(new UserSession({ appConfig }));
export const userDataState = atom();
export const userAddressAtom = atom((get) => {
  const userData = get(userDataState);
  const myAddress =
    process.env.NEXT_PUBLIC_STACKS_ENV === ENV_MAINNET
      ? userData?.profile?.stxAddress?.mainnet
      : userData?.profile?.stxAddress?.testnet;

  return myAddress;
});
export const authResponseState = atom();

export const useConnect = () => {
  const userSession = useAtomValue(userSessionState);
  const setUserData = useUpdateAtom(userDataState);
  const setAuthResponse = useUpdateAtom(authResponseState);

  const onFinish = async (payload) => {
    try {
      setAuthResponse(payload.authResponse);
      const userData = await payload.userSession.loadUserData();
      setUserData(userData);
    } catch (err) {
      console.error(err);
    }
  };

  const authOptions = {
    onFinish,
    userSession, // usersession is already in state, provide it here
    redirectTo: "/",
    manifestPath: "/manifest.json",
    appDetails: {
      name: "Infinity Square",
      icon: `https://www.infinitysquare.io/images/Infinity.svg`,
    },
  };

  const handleOpenAuth = () => {
    showConnect(authOptions);
  };

  const handleSignOut = useCallback(() => {
    userSession?.signUserOut("/");
  }, [userSession]);

  return { handleOpenAuth, handleSignOut, authOptions };
};
