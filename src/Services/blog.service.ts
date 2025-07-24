import axiosInstance from "../config/axiosInstance";

const blogsApi = {
    getAllBlog: async (page = 1, limit = 10, status?: string, search?: string) => {
        const response = await axiosInstance.get("/blogs", {
            params: {
                page,
                limit,
                ...(status && { status }),
                ...(search && { search }),
            },
        });
        console.log("allblogs api->", response);
        return response;
    },
    getBlog: (id: string) => {
        const response = axiosInstance.get("/blogs/" + id);
        console.log("getBlogByID->", response)
        return response
    },
}

export default blogsApi