import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const signUp = async credentials => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

export const logIn = async credentials => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

export const logOut = async () => {
  try {
    await axios.post('/users/logout');
  } catch (error) {
    throw new Error(error.response.status);
  }
};

export const fetchCurrentUser = async () => {
  try {
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
