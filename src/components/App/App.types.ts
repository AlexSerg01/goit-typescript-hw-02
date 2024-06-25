export type Img = {
  alt_description: string;
  id: string;
  description: string;
  urls: { small: string; regular: string; [key: string]: string };
  user: { username: string; [key: string]: string };
  [key: string]: unknown;
};
export type Imgs = Img[];
