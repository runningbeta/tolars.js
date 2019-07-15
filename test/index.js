import { assert } from 'chai';
import { isAddress } from '../src';

describe('Awesome test.', () => {
  it('should test isAddress function returns false', () => {
    const expectedVal = false;
    assert(isAddress('0x7b00ae36c7485b678fe945c2dd9349eb5baf7b6b') === expectedVal, 'Test failed :(');
  });

  it('should test awesome function returns true', () => {
    const expectedVal = true;
    assert(isAddress('54948c78114bc39675157e097830ae63c0da7857a19c13aec7') === expectedVal, 'Test failed :(');
  });
});
