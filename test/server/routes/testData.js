export const User = {
  firstName: 'john',
  lastName: 'doe',
  email: 'khord4eng@gmail.com',
  password: 'joejoe',
  avatarUrl: 'https://gravatar.com/avatar/aed61baf1e9256ed7d70e2cbbfcba9aa?s=400&d=robohash&r=x',
};

export const missingInput = {};

export const blankInput = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  avatarUrl: '',
};
export const invalidInput = {
  firstName: '12Ukhu',
  lastName: '@34seven',
  email: 'john.com',
  password: 'ukhu12',
  avatarUrl: 'gravatar/avatar/aed61baf1e9256ed7d70e2cbbfcba9aa?s=400&d=robohash&r=x',
};
export const wrongLengthInput = {
  firstName: 'o',
  lastName: 'thisisaverylongnamelongerthanexpected',
  email: 'johndoe@gmail.com',
  password: 'veryveryverylongpasswordhere',
  avatarUrl: 'https://gravatar.com/avatar/aed61baf1e9256ed7d70e2cbbfcba9aa?s=400&d=robohash&r=x',
};
