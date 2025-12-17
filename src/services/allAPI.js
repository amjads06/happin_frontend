import commonAPI from "./commonAPI";
import serverURL from "./serverURL";

// register
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/register`, reqBody);
};

// Login
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/login`, reqBody);
};


// ------------user APIs----------------

// update profile
export const updateUserDetailsAPI = async (reqBody, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/update-user-profile`,reqBody,reqHeader);
};

