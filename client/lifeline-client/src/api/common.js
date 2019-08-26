/**
 * Convert key-value pairs into a string of query string parameters to append to a URL.
 * @param {object} params Key-value pairs of query string parameters
 * @returns {string}
 */
const queryStringify = params => Object.keys(params)
  .filter(key => ![null, undefined].includes(params[key]))
  .map(key => `${key}=${params[key]}`)
  .join('&');

/**
 * Make a generic HTTP request.
 *
 * @param {string} path Path to the desired resource
 * @param {object} param Object containing optional parameters
 * @param {string} param.accessToken Access Token for resources that require it
 * @param {object} param.additionalOptions Additional options for Fetch API
 * @returns {Promise}
 */
const makeGenericRequest = (path, { accessToken, additionalOptions } = {}) => {
  const baseOptions = {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  };
  const errorMessage = 'Unable to process response from lifeline API.';

  if (accessToken) {
    baseOptions.headers.Authorization = `Bearer ${accessToken}`;
  }

  const url = `${process.env.LIFELINE_API}${path}`;
  const options = Object.assign({}, baseOptions, additionalOptions);

  return fetch(url, options)
    .then(response => response.json())
    .then((body) => {
      if ('error' in body) {
        throw new Error(typeof body.error === 'string' ? body.error : errorMessage);
      }

      return body;
    });
};


/**
 * Make a GET request.
 *
 * @param {string} path Path to the desired resource
 * @param {object} param Object containing optional parameters
 * @param {object} param.params Object containing key-value pairs of query string parameters
 * @param {string} param.accessToken Access Token for resources that require it
 * @param {object} param.additionalOptions Additional options for Fetch API
 * @returns {Promise}
 */
const makeGetRequest = (path, { params = {}, accessToken, options } = {}) => {
  const queriedParams = queryStringify(params);
  const queriedPath = queriedParams.length ? `${path}?${queriedParams}` : path;
  const additionalOptions = Object.assign({}, options, { method: 'GET' });
  return makeGenericRequest(queriedPath, { accessToken, additionalOptions });
};

/**
 * Make a POST request.
 *
 * @param {string} path Path to the desired resource
 * @param {object} body Object containing the body of the POST request
 * @param {object} param Object containing optional parameters
 * @param {string} param.accessToken Access Token for resources that require it
 * @param {object} param.additionalOptions Additional options for Fetch API
 * @returns {Promise}
 */
const makePostRequest = (path, body, { accessToken, options } = {}) => {
  const additionalOptions = Object.assign({}, options, { body: JSON.stringify(body), method: 'POST' });
  return makeGenericRequest(path, { accessToken, additionalOptions });
};

/**
 * Make a PUT request.
 *
 * @param {string} path Path to the desired resource
 * @param {object} param Object containing optional parameters
 * @param {string} param.accessToken Access Token for resources that require it
 * @param {object} param.additionalOptions Additional options for Fetch API
 * @returns {Promise}
 */
const makePutRequest = (path, body, { accessToken, options } = {}) => {
  const additionalOptions = Object.assign({}, options, { body: JSON.stringify(body), method: 'PUT' });
  return makeGenericRequest(path, { accessToken, additionalOptions });
};

/**
 * Make a DELETE request.
 *
 * @param {string} path Path to the desired resource
 * @param {object} param Object containing optional parameters
 * @param {string} param.accessToken Access Token for resources that require it
 * @param {object} param.additionalOptions Additional options for Fetch API
 * @returns {Promise}
 */
const makeDeleteRequest = (path, { accessToken, options } = {}) => {
  const additionalOptions = Object.assign({}, options, { method: 'DELETE' });
  return makeGenericRequest(path, { accessToken, additionalOptions });
};

export {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
  makeDeleteRequest,
};
