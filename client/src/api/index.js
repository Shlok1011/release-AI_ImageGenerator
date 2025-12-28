import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost  = async (data) => await API.post("/post/" , data);
export const GenerateAIImage  = async (data) => await API.post("/generateImage/" , data);


export const registerUser = async (data) => {
  const response = await API.post(`/auth/register`, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await API.post(`/auth/login`, data);
  return response.data;
};