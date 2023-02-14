import axios from 'axios'

export default class BaseAPI {

  constructor() {
    // this.host = "http://172.20.10.10:3030";
    this.host = "http://localhost:3030";
    this.api = "/";
  }

  getUrl() {
    return this.host + this.api;
  }

  async get(param) {
    var res = await axios({
      method: 'get',
      url: this.getUrl(),
      data: param
    });

    return res;
  }

  async post(param) {
    var res = await axios({
      method: 'post',
      url: this.getUrl(),
      data: param
    });

    return res;
  }

  async put(param) {
    var res = await axios({
      method: 'put',
      url: this.getUrl(),
      data: param
    });

    return res;
  }

  async delete(param) {
    var res = await axios({
      method: 'post',
      url: this.getUrl() + '/delete',
      data: param
    });

    return res;
  }


}