// import assert from 'assert';
import Btc38 from '../lib';

const btc = new Btc38({
  userId: '',
  key: '',
  secret: ''
});

describe('hamal-btc-38', function () {
  it('ticker', done => {
    btc.ticker('nxt').then(data => {
      console.log(data);
      done();
    });
  });

  it('balance', done => {
    btc.account().then(data => {
      console.log(data);
      done();
    });
  });
});
