import { makePostRequest, makeGetRequest } from './common';

const login = ({ email, password }) => makePostRequest('/login', { email, password });
const getGames = ({ accessToken }) => makeGetRequest('/games', { accessToken });
const joinGame = ({ accessToken, id }) => makePostRequest(`/games/${id}/join`, null, { accessToken });

export {
  login,
  getGames,
  joinGame,
};
