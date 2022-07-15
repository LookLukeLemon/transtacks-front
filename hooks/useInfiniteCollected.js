import axios from "axios";
import { QUERY_KEY_COLLECTED } from "common/Constants";
import { useInfiniteQuery } from "react-query";
import { sleep } from "utils";

const useInfiniteCollected = (
  account,
  collectionUrl,
  perPage,
  onSuccess,
  onError
) => {
  const fetchItems = async ({ pageParam = 1, signal }) => {
    const defaultReturn = {
      items: [],
      total: 0,
      nextPage: pageParam + 1,
      isLast: true,
    };

    if (!account) return defaultReturn;

    try {
      let baseUrl = `/api/account/nft-holdings?account=${account}`;

      if (collectionUrl) {
        baseUrl = `${baseUrl}&collectionUrl=${collectionUrl}`;
      }

      baseUrl = `${baseUrl}&page=${pageParam}&perPage=${perPage}`;

      const result = await axios.get(baseUrl, { signal });

      const { items, total } = result.data;

      return {
        items,
        total,
        nextPage: pageParam + 1,
        isLast: !(pageParam * perPage < total),
      };
    } catch (err) {
      return defaultReturn;
    }
  };

  return useInfiniteQuery(
    [QUERY_KEY_COLLECTED, account, collectionUrl],
    fetchItems,
    {
      onSuccess,
      onError,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.isLast ? undefined : lastPage.nextPage;
      },
    }
  );
};

export default useInfiniteCollected;
