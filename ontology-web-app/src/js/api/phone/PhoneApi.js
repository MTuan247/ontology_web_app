import BaseAPI from '../base/BaseApi';
import axios from 'axios'

class PhoneApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/mobile_phone"
  }

  async searchPhone(param) {
    const res = await axios({
      method: 'post',
      url: this.getUrl() + '/query',
      data: param,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    return res;
  }

  async insertPhone(param) {
    const res = await axios({
      method: 'post',
      url: this.getUrl() + '/update',
      data: param,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    return res;
  }
}

export default new PhoneApi