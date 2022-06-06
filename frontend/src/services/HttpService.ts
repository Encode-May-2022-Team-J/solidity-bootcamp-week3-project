import axios from 'axios';
class HttpService {
  public static get(url: string) {
    const xhr = axios.get(`${process.env.REACT_APP_API_ADDRESS}${url}`).then((res) => res.data);
    return xhr;
  }
  public static post(url: string, data?: any) {
    const xhr = axios
      .post(`${process.env.REACT_APP_API_ADDRESS}${url}`, data)
      .then((res) => res.data);
    return xhr;
  }
  public static mutler(url: string, data?: any) {
    const xhr = axios
      .post(`${process.env.REACT_APP_API_ADDRESS}${url}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => res.data);
    return xhr;
  }
}
export default HttpService;
