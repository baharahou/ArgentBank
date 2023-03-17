import axios from "axios";
// A mock function to mimic making an async request for data
export function fetchUser(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

// Default
axios.defaults.baseURL = "http://localhost:3001/api/v1/user";

//Get token request

const getToken = async (email, password) => {
  const response = await axios.post("/login", {
    email: email,
    password: password,
  });
  return response.data.body.token;
};
//Get user informations request

const getData = async () => {
  const response = await axios.post("/profile");
  return response.data.body;
};

//Send the new informations updated

const userEdit = async (firstName, lastName) => {
  return await axios.put("/profile", {
    firstName,
    lastName,
  });
};

/**
 * Stocked token
 * @param { string } token
 * @returns
 */
const setBearer = (token) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
};

export { getToken, getData, userEdit, setBearer };
