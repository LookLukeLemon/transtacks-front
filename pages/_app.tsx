import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout";
import { Connect } from "@stacks/connect-react";
import type { AppProps } from "next/app";
import { useConnect, userDataState, userSessionState } from "lib/auth";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  const { authOptions } = useConnect();
  const userSession = useAtomValue(userSessionState);
  const setUserData = useSetAtom(userDataState);

  useEffect(() => {
    if (userSession?.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn();
    }
  }, [userSession, setUserData]);

  return (
    <Connect authOptions={authOptions}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </Connect>
  );
}

export default MyApp;
