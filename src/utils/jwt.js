import decodeJWT from 'jwt-decode';
import _extend from "lodash/extend";

const payloadIsValid = payload =>
  payload && payload.exp * 1000 > new Date().getTime();

export const verifyJWT = (response) => {
  let data = response.data.user;

  const token = response
    .headers
    .authorization.split(' ')[1];

  if (typeof token !== 'string') {
    return Promise.reject(new Error('Token provided to verifyJWT is missing or not a string'));
  }

  try {
    const payload = decodeJWT(token);

    if (payloadIsValid(payload)) {
      data = _extend(data, {
        token: token,
        payload: payload
      })

      return Promise.resolve(data);
    }

    return Promise.reject(new Error('Invalid token: expired'));
  } catch (error) {
    return Promise.reject(new Error('Cannot decode malformed token.'));
  }
};
