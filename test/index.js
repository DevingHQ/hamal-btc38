// import assert from 'assert';
import Btc38 from '../lib';

const btc = new Btc38({
  userId: 206992,
  key: '0f8d972e5eb95f76ad5f583cd09e5e44',
  secret: 'd28fb0894f7ee9ea8acb39cce3f99bcf9029a21259aa22dd615be15885d2b597'
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
