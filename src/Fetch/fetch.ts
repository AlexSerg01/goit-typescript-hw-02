import axios from "axios";

interface FetchResponse {
  results: ImageData[];
  total_pages: number;
}

export default async function fetch(
  searchWord: string,
  page: number
): Promise<FetchResponse> {
  const BASE_URL = `https://api.unsplash.com/search/photos`;

  const params = {
    client_id: "t-tpu0Z6fMAIhCo4kYLJAwnWScE2maDO_TdjzTrJLgY",
    per_page: 15,
    query: searchWord,
    page,
  };

  const headers = {
    "Accept-Version": "v1",
  };

  const { data } = await axios.get(BASE_URL, { params, headers });
  return data;
}
