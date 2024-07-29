import axios from "axios";

const ACCESS_KEY = "_AWSqd6Exv2zosauslRSNaiBmAFpbMmmvdpZT3zCez0";

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: { query, page, per_page: 12 },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });
  return response.data;
};
