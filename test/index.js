import { assert, expect } from 'chai';
import { fromEthereumAddress, getAddress, isAddress } from '../src';

const TOLAR_ADDRESS_VALID_EXAMPLE_1 = '54948c78114bc39675157e097830ae63c0da7857a19c13aec7';

describe('Address test.', () => {
  it('should test fromEthereumAddress function throws on null', () => {
    expect(() => fromEthereumAddress()).to.throw();
  });

  it('should test fromEthereumAddress function throws on invalid address #1', () => {
    expect(() => fromEthereumAddress('ABC')).to.throw();
  });

  it('should test fromEthereumAddress function throws on invalid address #2', () => {
    expect(() => fromEthereumAddress('0x948c78114bc39675157e097830ae63c0da7857a19c13RRR7')).to.throw();
  });

  it('should test fromEthereumAddress function throws on hex number', () => {
    const val = 0x54948c78114bc39675157e097830ae63c0da7857a19c13aec7;
    expect(() => fromEthereumAddress(val)).to.throw();
  });

  it('should test fromEthereumAddress function returns correct Tolar address (hex prefix)', () => {
    const ethAddress = '0x948c78114bc39675157e097830ae63c0da7857a1';
    const expectedVal = TOLAR_ADDRESS_VALID_EXAMPLE_1;
    assert(fromEthereumAddress(ethAddress) === expectedVal, 'Test failed :(');
  });

  it('should test fromEthereumAddress function returns correct Tolar address (no hex prefix)', () => {
    const ethAddress = '948c78114bc39675157e097830ae63c0da7857a1';
    const expectedVal = TOLAR_ADDRESS_VALID_EXAMPLE_1;
    assert(fromEthereumAddress(ethAddress) === expectedVal, 'Test failed :(');
  });

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
    const expectedVal = TOLAR_ADDRESS_VALID_EXAMPLE_1;
    assert(getAddress(expectedVal) === expectedVal, 'Test failed :(');
  });

  it('should test getAddress function throws for invalid checksum', () => {
    const val = '54948c78114bc39675157e097830ae63c0da7857a19c13aec8';
    expect(() => getAddress(val)).to.throw();
  });

  it('should test isAddress function returns false for Ethereum address', () => {
    const expectedVal = false;
    assert(isAddress('0x7b00ae36c7485b678fe945c2dd9349eb5baf7b6b') === expectedVal, 'Test failed :(');
  });

  it('should test isAddress function returns true for Tolar address', () => {
    const expectedVal = true;
    assert(isAddress(TOLAR_ADDRESS_VALID_EXAMPLE_1) === expectedVal, 'Test failed :(');
  });

  it('should test isAddress function returns false for Tolar address with invalid checksum', () => {
    const expectedVal = false;
    assert(isAddress('54948c78114bc39675157e097830ae63c0da7857a19c13aec8') === expectedVal, 'Test failed :(');
  });
});
