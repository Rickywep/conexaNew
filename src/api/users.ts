import { UsersResponse } from "../features/users/types";
import api from "../services/api";

const users = {
  list: async () => {
    const res = await api.get<UsersResponse>('/users');
    return res.data;
  },
};

export default users;
