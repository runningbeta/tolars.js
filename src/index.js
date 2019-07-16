import { ethers } from 'ethers';

const TOLAR_ADDRESS_CHAR_LENGTH = 50;
const TOLAR_ADDRESS_CHECKSUM_START_INDEX = 42;
const TOLAR_ADDRESS_PREFIX = '54';

/**
 * The address is 25 bytes long.
 *
 * First byte being 0x54 ('T').
 *
 * Next 20 bytes are the eth address of the public key (right 160 bits of sha3 of pub_key).
 *
 * The last 4 bytes are the checksum of the previous 20 byte.
 * The checksum is calculated by taking the last 4 bytes of the sha3(sha3(20bytes-addr)).
 *
 * Example of a valid tolar address: 54948c78114bc39675157e097830ae63c0da7857a19c13aec7
 * Note how the address starts with "54" since it is the byte representation of "T".
 *
 * @param {Tolar address} address
 */
const getAddress = (address) => {
  if (typeof (address) !== 'string') throw new Error('Invalid address.');
  if (address.length !== TOLAR_ADDRESS_CHAR_LENGTH) throw new Error('Address wrong length. Should be 25 bytes or 50 characters long.');
  if (!address.startsWith(TOLAR_ADDRESS_PREFIX)) throw new Error('Address should start with "54" as byte representation of "T"');
  const ethAddress = ethers.utils.getAddress(`0x${address.substring(2, TOLAR_ADDRESS_CHECKSUM_START_INDEX)}`);
  const checksum = address.substring(TOLAR_ADDRESS_CHECKSUM_START_INDEX, TOLAR_ADDRESS_CHAR_LENGTH);
  // TODO: check checksum
  return `${TOLAR_ADDRESS_PREFIX}${ethAddress.substring(2).toLowerCase()}${checksum}`;
};

const isAddress = (address) => {
  try {
    getAddress(address);
  } catch (e) { return false; }
  return true;
};

export { getAddress, isAddress };
