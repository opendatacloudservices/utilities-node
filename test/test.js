const {dollarList} = require('../build/index');

test('dollarList', async () => {
  expect(dollarList(1, 3)).toBe('$2,$3,$4');
});