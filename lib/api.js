import axios from "axios";
import { ACCOUNT_COLLECTED_PER_PAGE } from "../common/Constants";

export const getNftItem = async (id) => {
  try {
    if (!id) return;

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-item/${id}`
    );

    return res.data ? res.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getNFTHoldings = async (
  account,
  collectionUrl,
  page = 1,
  perPage = ACCOUNT_COLLECTED_PER_PAGE
) => {
  if (!account) return { items: [], total: 0 };

  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/account/${account}`;

    if (collectionUrl) {
      baseUrl = `${baseUrl}/${collectionUrl}`;
    }

    baseUrl = `${baseUrl}?page=${page}&perPage=${perPage}`;

    const res = await axios.get(baseUrl);

    const { items, total } = res.data;
    return { items, total };
  } catch (err) {
    console.log(err);
    return { items: [], total: 0 };
  }
};

export const getAccountInfo = async (address) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/account/profile?address=${address}`
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
