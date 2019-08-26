import { makePostRequest } from './common';

const login = ({ email, password }) => makePostRequest('/login', { email, password });
const joinGame = ({ accessToken, id }) => makePostRequest(`/games/${id}/join`, null, { accessToken });

export {
  login,
  joinGame,
};
