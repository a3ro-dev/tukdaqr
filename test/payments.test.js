import test from 'node:test';
import assert from 'node:assert/strict';
import { splitAmount, paymentUri } from '../src/payments.js';

test('splits rupees exactly without losing paise', () => {
  assert.deepEqual(splitAmount(4500), [1999, 1999, 502]);
  assert.deepEqual(splitAmount(1999.01), [1999, 0.01]);
  assert.equal(splitAmount(199900).reduce((sum, value) => sum + value, 0), 199900);
});

test('encodes a standard UPI payment URI', () => {
  assert.equal(paymentUri({ upi: 'asha@bank', name: 'Asha Rao', note: 'Invoice 7' }, 1999, 0), 'upi://pay?pa=asha%40bank&pn=Asha+Rao&am=1999.00&cu=INR&tn=Invoice+7+%281%29');
});
