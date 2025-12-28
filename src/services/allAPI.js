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

// ---------------------user APIs--------------------------------

// update profile
export const updateUserDetailsAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/update-user-profile`,
    reqBody,
    reqHeader
  );
};

// get all events
export const getAllEventsAPI = async (searchKey) => {
  return await commonAPI("GET", `${serverURL}/all-events?search=${searchKey}`);
};

// get all Sports events
export const getAllSportsAPI = async (searchKey) => {
  return await commonAPI("GET", `${serverURL}/all-sports?search=${searchKey}`);
};

// get a event API
export const getAEventAPI = async (id) => {
  return await commonAPI("GET", `${serverURL}/view-event/${id}`, "");
};

// BookEvent


// -----------------users event managing section APIs-------------------------------

// Add Event
export const addEventAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${serverURL}/add-event`,
    reqBody,
    reqHeader
  );
};

// get all user uploded events
export const getAllUploadedEventsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/uploaded-events`, "", reqHeader);
};

// view a user uploded event
export const getAUploadedEventAPI = async (id,reqHeader) => {
  return await commonAPI("GET", `${serverURL}/uploaded-event/${id}`, "", reqHeader);
};


// update event
export const updateEventAPI = async (id,reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",  
    `${serverURL}/update-event/${id}`,
    reqBody,
    reqHeader
  );
};

// delete a event API
export const deleteAEventAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/delete-event/${id}`, "");
};


// Book an event
export const bookAnEventAPI = async (id,reqBody,reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/book-event/${id}`,reqBody,reqHeader);
};


// ----------------------------------------ADMIN------------------------------------------------------

// get all users
export const getAllUsersAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/all-users`,"",reqHeader);
};

// get all events for admin
export const getAllEventsAdminAPI = async () => {
  return await commonAPI("GET", `${serverURL}/all-events-admin`,);
};

// remove a user API
export const removeUserAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/remove-user/${id}`, "");
};

// Update events Status
export const updateEventStatusAPI = async (id,reqBody) => {
  return await commonAPI("PUT", `${serverURL}/update-event-status/${id}`,reqBody);
};


// delete a event Admin API
export const deleteAEventAdminAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/delete-event-admin/${id}`, "");
};
