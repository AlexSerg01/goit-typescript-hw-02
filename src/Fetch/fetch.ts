import axios from "axios";
import { FetchType } from "./fetch.types";

export default async function fetch<T>(
  searchWord: string,
  page: number
): Promise<T> {
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

  const data = await axios.get<T>(BASE_URL, { params, headers });
  return data.data;
}
