import api from "../services/api";
import { PostsResponse } from "../features/news/types";

const news = {
  list: async () => {
    const res = await api.get<PostsResponse>('/posts');
    return res;
  },
};

export default news;
