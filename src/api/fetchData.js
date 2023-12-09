import api from "./axiosconfig";

export const fetchdata = async () => {
  try {
    const response = await api.get("/image");
    console.log(response)
    // return response.data.map((item) => item.title);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
