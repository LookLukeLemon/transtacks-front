import axios from 'axios'
import { PER_PAGE } from '../common/Constants'
import { flattenCollection } from '../parser/collection'

export const addToCart = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/cart-item/add`,
      data
    )
    return res.data
  } catch (err) {
    throw err
  }
}

export const deleteCartItem = async (id) => {
  if (!id) return
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/cart-item/${id}`
    )

    return res.data
  } catch (err) {
    throw err
  }
}

export const deleteAllCartItems = async (address, cartType) => {
  if (!address || cartType === undefined || cartType === null) return
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/cart-item/all?account=${address}&cartType=${cartType}`
    )

    return res.data
  } catch (err) {
    throw err
  }
}

export const getCartItems = async (address, cartType) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cart-item`,
      { params: { account: address, cartType } }
    )

    return res.data
  } catch (err) {
    console.error(err)
    return { total: 0, items: [] }
  }
}

export const getCartItemsCount = async (address, cartType) => {
  if (!address || cartType === undefined || cartType === null)
    return { count: 0 }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cart-item/count`,
      { params: { account: address, cartType } }
    )
    return res.data
  } catch (err) {
    console.error(err)
    return { count: 0 }
  }
}

export const getTokenList = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/token-info/list`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return { total: 0, items: [] }
  }
}

export const getCollectionStats = async (collection_url) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/collection-stats/${collection_url}`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return { total: 0, items: [] }
  }
}

export const getSupportTokens = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/token-info/supported`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return { total: 0, items: [] }
  }
}

export const getReleasedCollections = async (page = 1, perPage = PER_PAGE) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-collection/released?page=${page}&perPage=${perPage}`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getNftCollections = async (page = 1, perPage = PER_PAGE) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-collection?page=${page}&perPage=${perPage}`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getNftCollectionsForFilter = async (
  page = 1,
  perPage = PER_PAGE
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-collection/light?page=${page}&perPage=${perPage}`
    )

    const { items, total } = res.data
    return { total, items }
  } catch (err) {
    console.error(err)
    return { total: 0, items: [] }
  }
}

export const getSearchedCollections = async (
  page = 1,
  perPage = PER_PAGE,
  searchQuery
) => {
  if (!searchQuery) return []

  try {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/nft-collection/search?page=${page}&perPage=${perPage}&searchQuery=${encodeURI(
        searchQuery
      )}`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getSearchedResult = async (searchQuery) => {
  if (!searchQuery)
    return [
      { items: [], total: 0 },
      { items: [], total: 0 },
    ]

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search?searchQuery=${encodeURI(
        searchQuery
      )}`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return [
      { items: [], total: 0 },
      { items: [], total: 0 },
    ]
  }
}

export const getNftCollectionsWithAccount = async (
  page = 1,
  perPage = PER_PAGE,
  account
) => {
  try {
    if (!account) return []

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-collection/account?page=${page}&perPage=${perPage}&account=${account}`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getNftCollection = async (collection_url, withAttrDetails) => {
  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/nft-collection/${collection_url}`

    if (withAttrDetails) {
      baseUrl = `${baseUrl}?withAttrDetails=${true}`
    }
    const res = await axios.get(baseUrl)

    return res.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getMarketplaceItems = async (
  page = 1,
  perPage,
  sortBy,
  sale,
  min,
  max,
  tokenInfo,
  collectionUrl,
  attributes
) => {
  try {
    if (!page || !perPage) return

    let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/marketplace/?page=${page}&perPage=${perPage}`

    if (sortBy) {
      baseUrl = `${baseUrl}&sortBy=${sortBy}`
    }

    if (sale) {
      baseUrl = `${baseUrl}&sale=${sale}`
    }

    if (min) {
      baseUrl = `${baseUrl}&min=${min}`
    }

    if (max) {
      baseUrl = `${baseUrl}&max=${max}`
    }

    if (tokenInfo) {
      baseUrl = `${baseUrl}&tokenInfo=${tokenInfo}`
    }

    if (collectionUrl) {
      baseUrl = `${baseUrl}&collectionUrl=${collectionUrl}`
    }

    if (attributes) {
      baseUrl = `${baseUrl}&attributes=${attributes}`
    }

    const res = await axios.get(baseUrl)
    const { items, total } = res.data
    return { items, total }
  } catch (err) {
    console.error(err)
    return { items: [], total: 0 }
  }
}

export const getNftItems = async (
  collectionUrl,
  page = 1,
  perPage,
  sortBy,
  attributes
) => {
  try {
    if (!collectionUrl || !page || !perPage) return

    let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/nft-item/?collectionUrl=${collectionUrl}&page=${page}&perPage=${perPage}`

    if (sortBy) {
      baseUrl = `${baseUrl}&sortBy=${sortBy}`
    }

    if (attributes) {
      baseUrl = `${baseUrl}&attributes=${attributes}`
    }
    const res = await axios.get(baseUrl)

    return res.data ? { ...res.data } : { notVerified: true }
  } catch (err) {
    console.error(err)
    return { notVerified: true }
  }
}

export const getNftItem = async (id) => {
  try {
    if (!id) return

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-item/${id}`
    )

    return res.data ? res.data : null
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getCollectionsOwnedByAccount = async (account) => {
  if (!account) return { items: [], total: 0 }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/account/${account}/collection`
    )

    const { items, total } = res.data
    return { items, total }
  } catch (err) {
    console.log(err)
    return { items: [], total: 0 }
  }
}

export const getAccountActivities = async (
  address,
  eventTypes,
  page = 1,
  perPage = PER_PAGE
) => {
  if (!address) return { items: [], total: 0 }

  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/account/${address}/activity?page=${page}&perPage=${perPage}`

    if (eventTypes) {
      baseUrl = `${baseUrl}&eventTypes=${eventTypes}`
    }

    const res = await axios.get(baseUrl)

    const { items, total } = res.data
    return { items, total }
  } catch (err) {
    console.log(err)
    return { items: [], total: 0 }
  }
}

export const getActivitiesByCollection = async (
  deployer,
  contract,
  eventTypes,
  page = 1,
  perPage = PER_PAGE
) => {
  if (!deployer || !contract) return { items: [], total: 0 }

  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/nft-activity/collection?deployer=${deployer}&contract=${contract}&page=${page}&perPage=${perPage}`

    if (eventTypes) {
      baseUrl = `${baseUrl}&eventTypes=${eventTypes}`
    }

    const res = await axios.get(baseUrl)
    const { items, total } = res.data
    return { items, total }
  } catch (err) {
    console.log(err)
    return { items: [], total: 0 }
  }
}

export const getActivitiesByMarket = async (
  page = 1,
  perPage = PER_PAGE,
  eventTypes
) => {
  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/nft-activity?page=${page}&perPage=${perPage}`

    if (eventTypes) {
      baseUrl = `${baseUrl}&eventTypes=${eventTypes}`
    }

    const res = await axios.get(baseUrl)
    const { items, total } = res.data

    return { items, total }
  } catch (err) {
    console.log(err)
    return { items: [], total: 0 }
  }
}

export const getActivitiesByItemId = async (
  itemId,
  page = 1,
  perPage = PER_PAGE
) => {
  if (!itemId) return { items: [], total: 0 }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-activity/${itemId}?page=${page}&perPage=${perPage}`
    )

    const { items, total } = res.data
    return { items, total }
  } catch (err) {
    console.log(err)
    return { items: [], total: 0 }
  }
}

export const getNFTHoldings = async (
  account,
  collectionUrl,
  itemStatus,
  page = 1,
  perPage = PER_PAGE
) => {
  if (!account) return { items: [], total: 0 }

  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/account/${account}`

    if (collectionUrl) {
      baseUrl = `${baseUrl}/${collectionUrl}`
    }

    if (itemStatus) {
      baseUrl = `${baseUrl}?itemStatus=${itemStatus}&page=${page}&perPage=${perPage}`
    } else {
      baseUrl = `${baseUrl}?page=${page}&perPage=${perPage}`
    }

    const res = await axios.get(baseUrl)

    const { items, total } = res.data
    return { items, total }
  } catch (err) {
    console.log(err)
    return { items: [], total: 0 }
  }
}

export const getNftItemBy = async (
  deployer,
  contract,
  blockchain,
  recordIndex
) => {
  try {
    if (!deployer || !contract || !blockchain || !recordIndex) return

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-item?deployer=${deployer}&contract=${contract}&blockchain=${blockchain}&recordIndex=${recordIndex}`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const getLandingNftCollection = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-collection/landing`
    )

    return res.data
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const postNftCollection = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/nft-collection`,
      data
    )

    return res.data
  } catch (err) {
    throw err
  }
}

export const getAccountInfo = async (address) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/account/profile?address=${address}`
    )

    return res.data
  } catch (err) {
    throw err
  }
}

export const postAccountInfo = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/account/profile`,
      data
    )

    return res.data
  } catch (err) {
    throw err
  }
}

export const patchAccountInfo = async (address, data) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/account/profile?address=${address}`,
      data
    )

    return res.data
  } catch (err) {
    throw err
  }
}

export const getLandingSummary = async () => {
  const landingNFT = await getLandingNftCollection()
  const landingCollections = await getNftCollections(1, 8)

  return {
    landingNFT: flattenCollection(landingNFT),
    landingCollections,
  }
}
