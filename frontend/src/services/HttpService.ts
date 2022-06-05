import axios from 'axios';
class HttpService {
  public static get(url: string) {
    const xhr = axios.get(`${process.env.REACT_APP_API_ADDRESS}${url}`).then((res) => res.data);
    return xhr;
  }
}
export default HttpService;
