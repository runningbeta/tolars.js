const getAddress = (address) => {
  if (!address) throw new Error('Address is null');
  if (!address.startsWith('54')) throw new Error('Address should start with "54"');
  // TODO: checksum
  return address;
};

const isAddress = (address) => {
  try {
    getAddress(address);
  } catch (e) { return false; }
  return true;
};

export { getAddress, isAddress };
