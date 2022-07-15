import { getNFTHoldings } from "lib/api";

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

const NftHoldings = async (req, res) => {
  const { account, collectionUrl, page, perPage } = req.query;

  res
    .status(200)
    .send(await getNFTHoldings(account, collectionUrl, page, perPage));
};

export default NftHoldings;
