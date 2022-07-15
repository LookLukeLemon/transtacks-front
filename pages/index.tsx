import InstructionAlert from "components/home/InstructionAlert";
import Orchestra from "components/home/Orchestra";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Transtacks</title>
      </Head>
      <div className="bg-base-200">
        <div className="2xl:container mx-auto px-4 py-8 gap-4 md:gap-8 flex flex-col h-full">
          <InstructionAlert />
          <div className="flex-1 ">
            <Orchestra />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
