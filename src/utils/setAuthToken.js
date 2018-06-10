import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every headers
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  } else {
    // delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;