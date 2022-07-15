import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout";
import { Connect } from "@stacks/connect-react";
import type { AppProps } from "next/app";
import { useConnect, userDataState, userSessionState } from "lib/auth";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";

const queryClient = new QueryClient();

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
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=3.0"
        />

        <title>Mixtacks</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Connect authOptions={authOptions}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </Connect>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
