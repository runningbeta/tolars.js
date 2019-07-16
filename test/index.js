import { assert, expect } from 'chai';
import { getAddress, isAddress } from '../src';

describe('Address test.', () => {
  it('should test getAddress function throws on null', () => {
    expect(() => getAddress()).to.throw();
  });

  it('should test getAddress function throws on hex number', () => {
    const val = 0x54948c78114bc39675157e097830ae63c0da7857a19c13aec7;
    expect(() => getAddress(val)).to.throw();
  });

  it('should test getAddress function throws on empty string', () => {
    const val = '';
    expect(() => getAddress(val)).to.throw();
  });

  it('should test getAddress function throws on string length !== 50', () => {
    const val = '54948c78114bc396751';
    expect(() => getAddress(val)).to.throw();
  });

  it('should test getAddress function throws for Ethereum address', () => {
    const val = '0x7b00ae36c7485b678fe945c2dd9349eb5baf7b6b';
    expect(() => getAddress(val)).to.throw();
  });

  it('should test getAddress function returns address', () => {
    const expectedVal = '54948c78114bc39675157e097830ae63c0da7857a19c13aec7';
    assert(getAddress(expectedVal) === expectedVal, 'Test failed :(');
  });

  it('should test isAddress function returns false for Ethereum address', () => {
    const expectedVal = false;
    assert(isAddress('0x7b00ae36c7485b678fe945c2dd9349eb5baf7b6b') === expectedVal, 'Test failed :(');
  });

  it('should test awesome function returns true', () => {
    const expectedVal = true;
    assert(isAddress('54948c78114bc39675157e097830ae63c0da7857a19c13aec7') === expectedVal, 'Test failed :(');
  });
});
