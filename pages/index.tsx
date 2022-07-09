import InstructionAlert from "components/home/InstructionAlert";
import Orchestra from "components/home/Orchestra";
import PlusButton from "components/home/PlusButton";
import PlusTenButton from "components/home/PlusTenButton";
import RecipientAndAmountPairDisplay from "components/home/RecipientAndAmountPairDisplay";
import SelectTokenGroup from "components/home/SelectTokenGroup";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Multi sender for KCV DAO</title>
      </Head>
      <div className="bg-base-200 min-h-screen">
        <div className="2xl:container mx-auto px-4 grid py-8 gap-8">
          <InstructionAlert />
          <Orchestra />
        </div>
      </div>
    </>
  );
};

export default Home;
