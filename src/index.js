import { ethers } from 'ethers';

const TOLAR_ADDRESS_CHAR_LENGTH = 50;
const TOLAR_ADDRESS_CHECKSUM_CHAR_LENGTH = 8;
const TOLAR_ADDRESS_CHECKSUM_START_INDEX = 42;
const TOLAR_ADDRESS_PREFIX = '54';

/**
 * Check if Tolar address string has correct shape.
 *
 * The address should be 25 bytes long, first byte being 0x54 ('T').
 *
 * @param {string} Tolar address
 * @throws {Error} invalid Tolar address shape
 */
const checkAddressShape = (address) => {
  if (typeof (address) !== 'string') throw new Error('Invalid address.');
  if (address.length !== TOLAR_ADDRESS_CHAR_LENGTH) throw new Error('Address wrong length. Should be 25 bytes or 50 characters long.');
  if (!address.startsWith(TOLAR_ADDRESS_PREFIX)) throw new Error('Address should start with "54" as byte representation of "T"');
};

/**
 * The address is 25 bytes long.
 *
 * First byte being 0x54 ('T').
 *
 * Next 20 bytes are the Ethereum address of the public key (right 160 bits of sha3 of pub_key).
 *
 * @param {string} Tolar address
 * @return {string} Ethereum address
 */
const getEthereumAddressSubstring = address => ethers.utils.getAddress(`0x${address.substring(2, TOLAR_ADDRESS_CHECKSUM_START_INDEX)}`);

/**
 * The address is 25 bytes long.
 *
 * First byte being 0x54 ('T').
 *
 * Next 20 bytes are the Ethereum address of the public key (right 160 bits of sha3 of pub_key).
 *
 * @param {string} Tolar address
 * @return {string} Ethereum address
 * @throws {Error} invalid address shape
 */
const getEthereumAddress = address => checkAddressShape(address)
  && getEthereumAddressSubstring(address);

/**
 * Generate Tolar address checksum from Ethereum address.
.*
 * The checksum is calculated by taking the last 4 bytes of the sha3(sha3(20bytes-addr)).
 *
 * @param {string} Tolar address
 * @return {string} Tolar address checksum generated from Ethereum address
 * @throws {Error} invalid Ethereum address
 */
const getChecksum = (address) => {
  const hash = ethers.utils.keccak256;
  const ethAddress = ethers.utils.getAddress(address);
  const digest = hash(hash(ethAddress));
  // last 4 bytes or 8 characters
  const startIndex = digest.length - TOLAR_ADDRESS_CHECKSUM_CHAR_LENGTH;
  return digest.substring(startIndex);
};

/**
 * Generate Tolar address from Ethereum address.
 *
 * @param {string} Ethereum address
 * @return {string} Tolar address
 * @throws {Error} invalid Ethereum address
 */
const fromEthereumAddress = (address) => {
  const addressNormalized = ethers.utils.getAddress(address)
    .toLowerCase()
    .substring(2);
  const checksum = getChecksum(address);
  return `${TOLAR_ADDRESS_PREFIX}${addressNormalized}${checksum}`;
};

/**
 * Check if Tolar address string has correct checksum.
 *
 * The Ethereum address is 20 bytes long.
 * The checksum is calculated by taking the last 4 bytes of the sha3(sha3(20bytes-addr)).
 *
 * @param {string} Tolar address
 * @throws {Error} invalid Ethereum address
 * @throws {Error} invalid address checksum
 */
const checkAddressChecksum = (address) => {
  const ethAddress = getEthereumAddressSubstring(address);
  const checksum = address.substring(TOLAR_ADDRESS_CHECKSUM_START_INDEX, TOLAR_ADDRESS_CHAR_LENGTH);
  if (checksum !== getChecksum(ethAddress)) throw new Error('Invalid address checksum');
};

/**
 * The address is 25 bytes long.
 *
 * First byte being 0x54 ('T').
 *
 * Next 20 bytes are the Ethereum address of the public key (right 160 bits of sha3 of pub_key).
 *
 * The last 4 bytes are the checksum of the previous 20 byte.
 * The checksum is calculated by taking the last 4 bytes of the sha3(sha3(20bytes-addr)).
 *
 * Example of a valid tolar address: 54948c78114bc39675157e097830ae63c0da7857a19c13aec7
 * Note how the address starts with "54" since it is the byte representation of "T".
 *
 * @param {string} Tolar address
 * @throws {Error} invalid Tolar address shape
 * @throws {Error} invalid Ethereum address
 * @throws {Error} invalid address checksum
 */
const getAddress = (address) => {
  checkAddressShape(address);
  checkAddressChecksum(address);
  return address;
};

/**
 * Check if string is valid Tolar address
 *
 * @param {string} Tolar address
 * @return {boolean} Tolar address validity
 */
const isAddress = (address) => {
  try {
    getAddress(address);
  } catch (e) { return false; }
  return true;
};

export default {
  fromEthereumAddress,
  getEthereumAddress,
  getAddress,
  isAddress
};
