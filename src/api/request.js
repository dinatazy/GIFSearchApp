import axios from './axios';

export const request = async (method, url, params = null, data = null) => {
  const config = {
    method,
    url,
    params,
    data,
  };
  try {
    const res = await axios.request(config);
    console.log('res', res)
    return res;
  } catch (err) {
    console.log('err', err);
  }
};
