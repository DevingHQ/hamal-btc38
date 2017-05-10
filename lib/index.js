import request from './request';
import crypto from 'crypto';

const DOMAIN = 'http://api.btc38.com';

export default class {
  constructor({key, secret, userId, version = 'v1'}) {
    this._hashes = [key, userId, secret];
    this._version = version;
    this._secret = secret;

    this._generatePublicApi();
  }

  // Private api
  account() {
    const api = this._makeApi('getMyBalance');
    return this._post(api);
  }

  buy(asset, price, amount, currency) {
    return this._submitOrder(1, {price, coinname: asset, amount, mk_type: currency});
  }

  sell(asset, price, amount, currency) {
    return this._submitOrder(2, {price, coinname: asset, amount, mk_type: currency});
  }

  orderList(asset, currency = 'cny') {
    const api = this._makeApi('getOrderList');
    return this._post(api, {coinname: asset, mk_type: currency});
  }

  tradeList(asset, currency = 'cny') {
    const api = this._makeApi('getMyTradeList');
    return this._post(api, {coinname: asset, mk_type: currency});
  }

  cancelOrder(orderId, currency = 'cny') {
    const api = this._makeApi('cancelOrder');
    return this._post(api, {order_id: orderId, mk_type: currency});
  }

  _submitOrder(type, {price, amount, coinname, mk_type = 'cny'}) {
    const api = this._makeApi('submitOrder');
    return this._post(api, {type, price, amount, coinname, mk_type});
  }

  // Utils
  _generatePublicApi() {
    ['ticker', 'trades', 'depth'].forEach(method => {
      this[method] = (asset = 'all', currency = 'cny') => {
        const api = this._makeApi(method);
        return this._get(api, {c: asset, mk_type: currency});
      };
    });
  }

  _makeApi(name) {
    return `/${this._version}/${name}.php`;
  }

  _get(api, qs = {}) {
    const uri = DOMAIN + api;
    return request.get({uri, qs});
  }

  _post(api, form = {}) {
    form.time = new Date().getTime();
    form.key = this._hashes[0];
    const hashes = this._hashes.slice(0);
    hashes.push(form.time);
    form.md5 = crypto.createHash('md5').update(hashes.join('_')).digest('hex');

    const uri = DOMAIN + api;
    return request.post({uri, form});
  }
}
