import { axiosInstance } from ".";

export const loginUser = async (reqBody) => {
    try {
        const data = await axiosInstance.post("/api/users/login", reqBody);
        return data;
    }
    catch(err) {
        console.log("ERR in login user", err);
    }
};

export const registerUser = async (reqBody) => {
    try {
        const data = await axiosInstance.post("/api/users/register", reqBody);
        return data;
    }
    catch(err) {
        console.log("ERR in register user", err);
    }
};

export const getUserDetails = async () => {
    try {
        const  { data } = await axiosInstance.get("/api/users/current-user");
        return data;
    }
    catch(err) {
        console.log("Err in getting user details", err);
    }
};