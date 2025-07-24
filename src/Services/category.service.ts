import axiosInstance from "../config/axiosInstance";
import type { ApiResponse} from "../Types/types";



const categoryApi = {
  getAllCategories: () => {
    console.log("Fetching all categories...");
    return axiosInstance.get<ApiResponse>("/categories");
  },
  searchCategory: (name: string) => {
    return axiosInstance.get<ApiResponse>("/categories/name/" + name);
  },
  getCategoryById: (id: string) => {
    return axiosInstance.get<ApiResponse>("/categories/" + id);
  },
};

export default categoryApi;
