/**
 * Custom `vue-toasted` implementation that injects global options into a Vue instance.
 *
 * The named function must specify (and handle) two parameters:
 *    1. An object literal what allows the calling function to specify parameters
 *    2. A function which executes the `vue-toasted.show(message, options)` callback
 */

import toasted from 'vue-toasted';

const DEFAULT_DURATION = 2000;

const globalToasts = {
  /**
   * Timed toast to notify user of an error.
   *
   * @param {string} message The message to prompt the user
   * @param {int} duration The duration in ms to keep the prompt
   * @param {function} callback
   * @returns {object} Return value of `callback()`
   */
  error: ({ message, duration }, callback) => {
    if (!message) throw new Error('Payload must contain a message.');

    const options = {
      type: 'error',
      duration: duration || DEFAULT_DURATION,
      action: [
        {
          text: 'Dismiss',
          onClick: (e, toastObject) => toastObject.goAway(0),
        },
      ],
    };

    return callback(message, options);
  },

  /**
   * Timed toast to notify user of a success.
   *
   * @param {string} message The message to prompt the user
   * @param {int} duration The duration in ms to keep the prompt
   * @param {function} callback
   * @returns {object} Return value of `callback()`
   */
  success: ({ message, duration }, callback) => {
    if (!message) throw new Error('Payload must contain a message.');

    const options = {
      type: 'success',
      duration: duration || DEFAULT_DURATION,
      action: [
        {
          text: 'Dismiss',
          onClick: (e, toastObject) => toastObject.goAway(0),
        },
      ],
    };

    return callback(message, options);
  },
};

export default {
  install: (Vue, options) => Vue.use(toasted, Object.assign({}, options, { globalToasts })),
};
