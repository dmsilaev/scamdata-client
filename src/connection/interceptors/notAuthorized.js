import store from "store";

const success = (response) => {
  return response;
};

const error = (error) => {
  if (401 === error.response.status) {
    store.remove("userStore");
    window.location = '/login';
  } else {
    return Promise.reject(error);
  }
}

export default [success, error];
