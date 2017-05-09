/**
 * Created by Grea on 5/10/17.
 */
import request from 'request-promise';

export default {
  get(options = {}) {
    options.json = true;
    return request.get(options);
  },
  post(options = {}) {
    options.json = true;
    return request.post(options)
  }
};

