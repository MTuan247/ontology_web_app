import BaseAPI from '../base/BaseApi';

class PhoneApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/api/phones"
  }
}

export default new PhoneApi